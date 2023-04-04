import { User } from "@prisma/client";
export type UserCreateData = Omit<User, "id">;
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import verifyIsUserEmailAlreadyInUse from "../utils/verifyEmailAlreadyInUse.js";
import verifyIsUserExistsByEmail from "../utils/verifyIfUserExistByEmail.js";
import verifyIfUserIsBlocked from "../utils/verifyIfUserIsBlocked.js";
import * as authRepository from "../repositories/authRepository.js";
import { AppError } from "../errors/AppError.js";

export async function registerUser(user: UserCreateData) {
  await verifyIsUserEmailAlreadyInUse(user.email);

  const hashedPassword = await bcrypt.hash(user.password, 10);

  await authRepository.insert(user, hashedPassword);
}

export async function loginUser(email: string, password: string) {
  const verify = await verifyIsUserExistsByEmail(email);
  const { MAX_LOGIN_ATTEMPTS } = process.env;
  const { JWT_SECRET } = process.env;
  const { JWT_REFRESH_SECRET } = process.env;

  if (!verify) {
    throw new AppError("Email or password incorrect", 401);
  }

  await verifyIfUserIsBlocked(email);

  const { id } = verify;

  if (!MAX_LOGIN_ATTEMPTS) {
    throw new AppError("MAX_LOGIN_ATTEMPTS not found");
  }

  const isPasswordCorrect = await bcrypt.compare(password, verify.password);

  if (!isPasswordCorrect) {
    await authRepository.incrementFailedLoginAttempts(verify.id);
    if (verify.failed_attempts >= +MAX_LOGIN_ATTEMPTS) {
      const blockedUntil = new Date(new Date().getTime() + 10 * 60 * 500);
      await authRepository.setBlockUntil(verify.id, blockedUntil);
      throw new AppError(
        "Too many failed login attempts. Account locked for 5 minutes.",
        401
      );
    }
    throw new AppError("Email or password incorrect", 401);
  }

  await authRepository.resetFailedAttempts(verify.id);

  if (!JWT_SECRET || !JWT_REFRESH_SECRET) {
    throw new AppError("JWT_SECRET not found");
  }

  const acessToken = jwt.sign({ id }, JWT_SECRET, { expiresIn: "1h" });
  const refreshToken = jwt.sign({ id }, JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });

  await authRepository.setRefreshToken(id, refreshToken);

  return { acessToken, refreshToken };
}

export async function refreshToken(refreshToken: string) {
  const { JWT_SECRET } = process.env;
  const { JWT_REFRESH_SECRET } = process.env;

  if (!JWT_REFRESH_SECRET || !JWT_SECRET)
    throw new AppError("JWT_REFRESH_SECRET not found");

  try {
    const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET) as {
      id: string;
    };
    const user = await authRepository.verifyRefreshToken(
      +decoded.id,
      refreshToken
    );

    if (!user) throw new AppError("Invalid refresh token", 401);

    const newAcessToken = jwt.sign({ id: decoded.id }, JWT_SECRET, {
      expiresIn: "1h",
    });
    const newRefreshToken = jwt.sign({ id: decoded.id }, JWT_REFRESH_SECRET, {
      expiresIn: "7d",
    });

    await authRepository.setRefreshToken(+decoded.id, refreshToken);
    return { newAcessToken, newRefreshToken };
  } catch (err) {
    throw new AppError("Invalid refresh token", 401);
  }
}

export async function logoutUser(refreshToken: string) {
  const { JWT_REFRESH_SECRET } = process.env;

  if (!JWT_REFRESH_SECRET) throw new AppError("JWT_REFRESH_SECRET not found");

  try {
    const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET) as {
      id: string;
    };

    const user = await authRepository.verifyRefreshToken(
      +decoded.id,
      refreshToken
    );

    if (!user) throw new AppError("Invalid refresh token", 401);

    await authRepository.deleteRefreshToken(+decoded.id);
  } catch (err) {
    throw new AppError("Invalid refresh token", 401);
  }
}
