import { Product } from "@prisma/client";
import { AppError } from "../errors/AppError.js";
export type ProductCreateData = Omit<Product, "id">;
import * as ProductRepository from "../repositories/productRepository.js";

export async function createProduct(product: ProductCreateData) {
  await ProductRepository.insert(product);
}

export async function getAllProducts(
  page: string | undefined = "1",
  take: string | undefined = "10"
) {
  if (+page <= 0 || +take <= 0) {
    throw new AppError("Invalid page or take", 422);
  }

  const products = await ProductRepository.getAll(page, take);

  if (products.length === 0) {
    throw new AppError("No products found", 404);
  }

  return {
    page: +page,
    products,
  };
}

export async function getProductById(id: string) {
  const product = await ProductRepository.getById(id);

  if (!product) {
    throw new AppError("Product not found", 404);
  }

  return product;
}

export async function getProductByCategory(category_id: string) {
  const products = await ProductRepository.getByCategory(category_id);

  if (!products) {
    throw new AppError("Product not found", 404);
  }

  return products;
}

export async function updateProduct(id: string, product: Product) {
  const productExists = await ProductRepository.getById(id);

  if (!productExists) {
    throw new AppError("Product not found", 404);
  }

  await ProductRepository.update(id, product);
}

export async function deleteProduct(id: string) {
  const productExists = await ProductRepository.getById(id);

  if (!productExists) {
    throw new AppError("Product not found", 404);
  }

  await ProductRepository.remove(id);
}

export async function countProducts() {
  return await ProductRepository.count();
}

export async function searchProduct(query: string, page: string, take: string) {
  const products = await ProductRepository.search(query, page, take);

  if (products.length === 0) {
    throw new AppError("No products found", 404);
  }

  return {
    page: +page,
    products,
  };
}
