import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError.js";
import * as authRepository from "../repositories/authRepository.js";

interface CustomRequest extends Request {
  userId?: string;
}

export async function adminAuthMiddleware(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    throw new AppError("Token not provided", 401);
  }

  try {
    if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET not found");
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload & {
      id: string;
    };
    const user = await authRepository.verifyUserId(+decoded.id);
    if (!user) throw new Error("User not found");
    if (!user.is_admin) throw new Error("User is not an admin");
    req.userId = decoded.id;
    next();
  } catch (err) {
    throw new AppError("Invalid token", 401);
  }
}
