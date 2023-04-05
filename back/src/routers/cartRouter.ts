import { Router } from "express";
import { validateSchemaMiddleware } from "../middlewares/validateSchema.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { cartSchema } from "../schemas/cartSchema.js";
import * as cartController from "../controllers/cartController.js";

const cartRouter = Router();

cartRouter.post(
  "/cart/register",
  authMiddleware,
  validateSchemaMiddleware(cartSchema),
  cartController.register
);

cartRouter.get("/cart/:user_id", authMiddleware, cartController.getAll);

cartRouter.put(
  "/cart/increment/:cart_id",
  authMiddleware,
  cartController.increment
);

cartRouter.put(
  "/cart/decrement/:cart_id",
  authMiddleware,
  cartController.decrement
);

cartRouter.delete(
  "/cart/remove/:cart_id",
  authMiddleware,
  cartController.removeProduct
);

cartRouter.delete(
  "/cart/remove-all/:user_id",
  authMiddleware,
  cartController.removeAll
);

cartRouter.get("/cart/total/:user_id", authMiddleware, cartController.getTotal);

export default cartRouter;
