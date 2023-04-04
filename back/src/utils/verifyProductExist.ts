import { AppError } from "../errors/AppError.js";
import * as productRepository from "../repositories/productRepository.js";

export default async function verifyProductExist(product_id: number) {
  const product = await productRepository.getById(product_id);

  if (!product) {
    throw new AppError("Product not found", 404);
  }
}
