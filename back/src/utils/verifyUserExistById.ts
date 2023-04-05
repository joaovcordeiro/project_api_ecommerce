import { AppError } from "../errors/AppError.js";
import * as userRepository from "../repositories/authRepository.js";

export default async function verifyUserExistById(user_id: number) {
  const user = await userRepository.verifyUserId(user_id);

  if (!user) {
    throw new AppError("User not found", 404);
  }
}
