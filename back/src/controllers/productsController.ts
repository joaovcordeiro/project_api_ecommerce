import { Request, Response } from "express";
import * as productService from "../services/productsService.js";

export async function register(req: Request, res: Response) {
  const product = req.body;

  await productService.createProduct(product);

  return res.status(201).json({ message: "Product created" });
}

export async function getAll(req: Request, res: Response) {
  const page = req.query.page as string | undefined;
  const take = req.query.take as string | undefined;
  const products = await productService.getAllProducts(page, take);

  return res.status(200).json(products);
}

export async function getById(req: Request, res: Response) {
  const id = req.params.id;

  const product = await productService.getProductById(id);

  return res.status(200).json(product);
}

export async function getByCategory(req: Request, res: Response) {
  const page = req.query.page as string | undefined;
  const take = req.query.take as string | undefined;
  const category_id = req.params.category_id;

  const products = await productService.getProductByCategory(
    category_id,
    page,
    take
  );

  return res.status(200).json(products);
}

export async function update(req: Request, res: Response) {
  const id = req.params.id;
  const product = req.body;

  await productService.updateProduct(id, product);

  return res.status(200).json({ message: "Product updated" });
}

export async function remove(req: Request, res: Response) {
  const id = req.params.id;

  await productService.deleteProduct(id);

  return res.status(200).json({ message: "Product deleted" });
}

export async function count(req: Request, res: Response) {
  const count = await productService.countProducts();

  return res.status(200).json({ quantity: count });
}

export async function search(req: Request, res: Response) {
  const page = req.query.page as string | undefined;
  const take = req.query.take as string | undefined;
  const search = req.query.search as string | undefined;

  const products = await productService.searchProduct(search, page, take);

  return res.status(200).json(products);
}

export async function getByPriceRange(req: Request, res: Response) {
  const page = req.query.page as string | undefined;
  const take = req.query.take as string | undefined;
  const min = req.query.min as number | undefined;
  const max = req.query.max as number | undefined;

  const products = await productService.getByPriceRange(min, max, page, take);

  return res.status(200).json(products);
}
