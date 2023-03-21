import * as authRepository from "../repositories/authRepository.js";
import { AppError } from "../errors/AppError.js";

export default async function verifyIfUserIsBlocked(email: string) {
  const user = await authRepository.verifyEmail(email);
  const { MAX_LOGIN_ATTEMPTS } = process.env;

  if (user) {
    if (user.blocked_until && new Date() < user.blocked_until) {
      throw new AppError("Account is blocked. Please try again later.", 401);
    } else {
      if (MAX_LOGIN_ATTEMPTS && user.failed_attempts === +MAX_LOGIN_ATTEMPTS) {
        authRepository.resetFailedAttempts(user.id);
      }
      await authRepository.resetBlockedUntil(user.id);
    }
  }
}
