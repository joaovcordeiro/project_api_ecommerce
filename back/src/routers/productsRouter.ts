import { Router } from "express";
import { validateSchemaMiddleware } from "../middlewares/validateSchema.js";
import { adminAuthMiddleware } from "../middlewares/adminAuthMiddleware.js";
import { productSchema } from "../schemas/productSchema.js";
import * as productController from "../controllers/productsController.js";

const productRouter = Router();

productRouter.post(
  "/product/register",
  adminAuthMiddleware,
  validateSchemaMiddleware(productSchema),
  productController.register
);

productRouter.get("/product", productController.getAll);

productRouter.get("/product/price_range", productController.getByPriceRange);

productRouter.get("/product/search", productController.search);

productRouter.get("/product/count", productController.count);

productRouter.get("/product/:id", productController.getById);

productRouter.get(
  "/product/category/:category_id",
  productController.getByCategory
);

productRouter.put(
  "/product/:id",
  adminAuthMiddleware,
  validateSchemaMiddleware(productSchema),
  productController.update
);

productRouter.delete(
  "/product/:id",
  adminAuthMiddleware,
  productController.remove
);

export default productRouter;
