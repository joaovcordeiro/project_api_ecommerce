import { Request, Response } from "express";
import * as imageService from "../services/imageService.js";

export async function register(req: Request, res: Response) {
  const image = req.body;

  await imageService.createImage(image);

  return res.status(201).json({ message: "Image created successfully" });
}

export async function deleteImage(req: Request, res: Response) {
  const id = req.params.id;

  await imageService.deleteImage(+id);

  return res.status(200).json({ message: "Image deleted successfully" });
}

export async function updateImage(req: Request, res: Response) {
  const id = req.params.id;
  const image = req.body;

  await imageService.updateImage(+id, image);

  return res.status(200).json({ message: "Image updated successfully" });
}
