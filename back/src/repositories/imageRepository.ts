import { prisma } from "../config/database.js";
import { Image } from "@prisma/client";
import { ImageCreateData } from "../services/imageService.js";

export async function insert(image: ImageCreateData) {
  await prisma.image.create({
    data: {
      url: image.url,
      product_id: image.product_id,
    },
  });
}

export async function getImageById(id: number) {
  return await prisma.image.findUnique({
    where: {
      id: id,
    },
  });
}

export async function remove(id: number) {
  return await prisma.image.delete({
    where: {
      id: id,
    },
  });
}

export async function removeByProductId(product_id: number) {
  return await prisma.image.deleteMany({
    where: {
      product_id: product_id,
    },
  });
}

export async function update(id: number, image: ImageCreateData) {
  return await prisma.image.update({
    where: {
      id: id,
    },
    data: {
      url: image.url,
      product_id: image.product_id,
    },
  });
}
