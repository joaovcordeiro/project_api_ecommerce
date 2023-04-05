import { AppError } from "../errors/AppError.js";
import * as CartRepository from "../repositories/cartRepository.js";

export default async function verifyCartExist(cart_id: number) {
  const cart = await CartRepository.getById(cart_id);

  if (!cart) {
    throw new AppError("Cart not found", 404);
  }
}
