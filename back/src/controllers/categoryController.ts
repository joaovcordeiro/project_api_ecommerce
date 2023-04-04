import { Request, Response } from "express";
import * as categoryService from "../services/categoryService.js";

export async function register(req: Request, res: Response) {
  const category = req.body;

  await categoryService.createCategory(category);

  return res.status(201).json({ message: "Category created successfully" });
}

export async function getAll(req: Request, res: Response) {
  const categories = await categoryService.getAllCategories();

  return res.status(200).json(categories);
}

export async function getById(req: Request, res: Response) {
  const id = Number(req.params.id);

  const category = await categoryService.getCategoryById(id);

  return res.status(200).json(category);
}

export async function update(req: Request, res: Response) {
  const id = +req.params.id;
  const category = req.body;

  await categoryService.updateCategory(id, category);

  return res.status(200).json({ message: "Category updated successfully" });
}

export async function remove(req: Request, res: Response) {
  const id = +req.params.id;

  await categoryService.deleteCategory(id);

  return res.status(200).json({ message: "Category deleted successfully" });
}
