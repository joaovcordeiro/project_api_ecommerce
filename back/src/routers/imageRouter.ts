import Router from "express";
import { validateSchemaMiddleware } from "../middlewares/validateSchema.js";
import { adminAuthMiddleware } from "../middlewares/adminAuthMiddleware.js";
import { imageSchema } from "../schemas/imageSchema.js";
import * as imageController from "../controllers/imageController.js";

const imageRouter = Router();

imageRouter.put("/image", adminAuthMiddleware, imageController.updateImage);

imageRouter.post(
  "/image/register",
  adminAuthMiddleware,
  validateSchemaMiddleware(imageSchema),
  imageController.register
);

imageRouter.delete(
  "image/:id",
  adminAuthMiddleware,
  imageController.deleteImage
);

export default imageRouter;
