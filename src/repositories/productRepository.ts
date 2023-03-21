import { prisma } from "../config/database.js";
import { Product } from "@prisma/client";
import { ProductCreateData } from "../services/productsService.js";

export async function insert(product: ProductCreateData) {
  await prisma.product.create({
    data: {
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      category_id: product.category_id,
    },
  });
}

export async function getAll(page: string, take: string) {
  return await prisma.product.findMany({
    take: +take,
    skip: +take * (+page - 1),
  });
}

export async function getById(id: string) {
  return await prisma.product.findUnique({
    where: {
      id: +id,
    },
  });
}

export async function getByCategory(category_id: string) {
  return await prisma.product.findMany({
    where: {
      category_id: +category_id,
    },
  });
}

export async function update(id: string, product: Product) {
  await prisma.product.update({
    where: {
      id: +id,
    },
    data: {
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      category_id: product.category_id,
    },
  });
}

export async function remove(id: string) {
  await prisma.product.delete({
    where: {
      id: +id,
    },
  });
}

export async function count() {
  return await prisma.product.count();
}

export async function search(query: string, page: string, take: string) {
  return await prisma.product.findMany({
    where: {
      OR: [
        {
          name: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: query,
            mode: "insensitive",
          },
        },
      ],
    },
    take: +take,
    skip: +take * (+page - 1),
  });
}
