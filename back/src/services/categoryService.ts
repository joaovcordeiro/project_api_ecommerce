import { Category } from "@prisma/client";
export type CategoryCreateData = Omit<Category, "id">;
import * as categoryRepository from "../repositories/categoryRepository.js";
import { AppError } from "../errors/AppError.js";

export async function createCategory(category: CategoryCreateData) {
  const item = await categoryRepository.getByName(category.name);

  if (item) {
    throw new AppError("Category already exists", 400);
  }

  await categoryRepository.insert(category);
}

export async function getAllCategories() {
  return await categoryRepository.getAll();
}

export async function getCategoryById(id: number) {
  return await categoryRepository.getById(id);
}

export async function updateCategory(id: number, category: CategoryCreateData) {
  const item = await categoryRepository.getById(id);

  if (!item) {
    throw new AppError("Category not found", 404);
  }

  await categoryRepository.update(id, category);
}

export async function deleteCategory(id: number) {
  const item = await categoryRepository.getById(id);

  if (!item) {
    throw new AppError("Category not found", 404);
  }

  await categoryRepository.remove(id);
}
