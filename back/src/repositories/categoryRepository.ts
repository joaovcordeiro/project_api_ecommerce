import { prisma } from "../config/database.js";
import { Category } from "@prisma/client";
import { CategoryCreateData } from "../services/categoryService.js";

export async function insert(category: CategoryCreateData) {
  return await prisma.category.create({
    data: {
      name: category.name,
      description: category.description,
    },
  });
}

export async function getAll() {
  return await prisma.category.findMany();
}

export async function getById(id: number) {
  return await prisma.category.findUnique({
    where: {
      id: id,
    },
  });
}

export async function getByName(name: string) {
  return await prisma.category.findUnique({
    where: {
      name: name,
    },
  });
}

export async function update(id: number, category: CategoryCreateData) {
  return await prisma.category.update({
    where: {
      id: id,
    },
    data: {
      name: category.name,
      description: category.description,
    },
  });
}

export async function remove(id: number) {
  return await prisma.category.delete({
    where: {
      id: id,
    },
  });
}
