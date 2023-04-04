import { Router } from "express";
import * as categoryController from "../controllers/categoryController.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchema.js";
import { categorySchema } from "../schemas/categorySchema.js";
import { adminAuthMiddleware } from "../middlewares/adminAuthMiddleware.js";

const categoryRouter = Router();

categoryRouter.post(
  "/category/register",
  adminAuthMiddleware,
  validateSchemaMiddleware(categorySchema),
  categoryController.register
);

categoryRouter.get("/category", categoryController.getAll);

export default categoryRouter;
