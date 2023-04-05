import { Cart, Product } from "@prisma/client";
export type CartCreateData = Omit<Cart, "id">;
import jwt from "jsonwebtoken";

import * as CartRepository from "../repositories/cartRepository.js";
import verifyUserExistById from "../utils/verifyUserExistById.js";
import verifyProductsExist from "../utils/verifyProductExist.js";
import verifyCartExist from "../utils/verifyCartExist.js";
import { AppError } from "../errors/AppError.js";

export async function register(cart: CartCreateData, token: string) {
  const { JWT_SECRET } = process.env;

  if (!JWT_SECRET) throw new AppError("JWT_REFRESH_SECRET not found");

  const decoded = jwt.verify(token, JWT_SECRET) as {
    id: string;
  };

  cart.user_id = +decoded.id;

  await verifyUserExistById(cart.user_id);
  await verifyProductsExist(cart.product_id);

  await CartRepository.insert(cart);
}

export async function getAllCart(user_id: number) {
  await verifyUserExistById(user_id);

  const cart = await CartRepository.getAll(user_id);

  return cart;
}

export async function incrementProduct(cartId: number) {
  await verifyCartExist(cartId);

  await CartRepository.incrementProduct(cartId);
}

export async function decrementProduct(cartId: number) {
  await verifyCartExist(cartId);

  await CartRepository.decrementProduct(cartId);
}

export async function deleteProduct(cartId: number) {
  await verifyCartExist(cartId);

  await CartRepository.deleteProduct(cartId);
}

export async function deleteAllProducts(user_id: number) {
  await verifyUserExistById(user_id);

  await CartRepository.deleteAllProducts(user_id);
}

export async function getCartTotal(user_id: number) {
  await verifyUserExistById(user_id);

  const cart = await CartRepository.getAll(user_id);

  const total = cart.reduce((acc: number, cart: Cart) => {
    return acc + cart.price * cart.quantity;
  }, 0);

  return total;
}
