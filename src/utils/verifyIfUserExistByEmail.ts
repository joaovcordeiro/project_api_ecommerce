import * as authRepository from "../repositories/authRepository.js";

export default async function verifyIsUserExistsByEmail(email: string) {
  const user = await authRepository.verifyEmail(email);

  return user;
}
