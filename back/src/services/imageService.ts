import { Image } from "@prisma/client";
import { AppError } from "../errors/AppError.js";
export type ImageCreateData = Omit<Image, "id">;
import * as imageRepository from "../repositories/imageRepository.js";
import verifyProductExist from "../utils/verifyProductExist.js";

export async function createImage(image: ImageCreateData) {
  await verifyProductExist(image.product_id);

  await imageRepository.insert(image);
}

export async function deleteImage(id: number) {
  const image = await imageRepository.getImageById(id);

  if (!image) {
    throw new AppError("Image not found", 404);
  }

  await imageRepository.remove(id);
}

export async function deleteImageByProduct(product_id: number) {
  await verifyProductExist(product_id);

  await imageRepository.removeByProductId(product_id);
}

export async function updateImage(id: number, image: ImageCreateData) {
  const item = await imageRepository.getImageById(id);

  if (!item) {
    throw new AppError("Image not found", 404);
  }

  await imageRepository.update(id, image);
}
