import { Request, Response } from "express";
import * as cartService from "../services/cartService.js";

export async function register(req: Request, res: Response) {
  const token = req.headers.authorization?.split(" ")[1];
  const cart = req.body;

  if (!token) return res.status(401).json({ message: "Token not provided" });

  await cartService.register(cart, token);

  return res.status(201).json({ message: "Product added to cart" });
}

export async function getAll(req: Request, res: Response) {
  const user_id = +req.params.user_id;

  const cart = await cartService.getAllCart(user_id);

  return res.status(200).json(cart);
}

export async function increment(req: Request, res: Response) {
  const cartId = +req.params.cart_id;

  await cartService.incrementProduct(cartId);

  return res.status(200).json({ message: "Product quantity incremented" });
}

export async function decrement(req: Request, res: Response) {
  const cartId = +req.params.cart_id;

  await cartService.decrementProduct(cartId);

  return res.status(200).json({ message: "Product quantity decremented" });
}

export async function removeProduct(req: Request, res: Response) {
  const cartId = +req.params.cart_id;

  await cartService.deleteProduct(cartId);

  return res.status(200).json({ message: "Product removed from cart" });
}

export async function removeAll(req: Request, res: Response) {
  const user_id = +req.params.user_id;

  await cartService.deleteAllProducts(user_id);

  return res.status(200).json({ message: "All products removed from cart" });
}

export async function getTotal(req: Request, res: Response) {
  const user_id = +req.params.user_id;

  const total = await cartService.getCartTotal(user_id);

  return res.status(200).json({ total });
}
