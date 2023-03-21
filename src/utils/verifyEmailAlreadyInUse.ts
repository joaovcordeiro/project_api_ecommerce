import { AppError } from "../errors/AppError.js";
import * as authRepository from "../repositories/authRepository.js";

export default async function verifyIsUserEmailAlreadyInUse(email: string) {
  const isEmailAlreadyInUse = await authRepository.verifyEmail(email);

  if (isEmailAlreadyInUse) {
    throw new AppError("Email already in use", 409);
  }

  return;
}
