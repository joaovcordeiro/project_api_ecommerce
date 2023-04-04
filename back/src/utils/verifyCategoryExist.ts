import { AppError } from "../errors/AppError.js";
import * as categoryRepository from "../repositories/categoryRepository.js";

export default async function verifyCategoryExist(category_id: number) {
  const category = await categoryRepository.getById(category_id);

  if (!category) {
    throw new AppError("Category not found", 404);
  }
}
