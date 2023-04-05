import { Router } from "express";
import authRouter from "./authRouter.js";
import productsRouter from "./productsRouter.js";
import categoryRouter from "./categoryRouter.js";
import imageRouter from "./imageRouter.js";
import cartRouter from "./cartRouter.js";

const router = Router();
router.use(authRouter);
router.use(productsRouter);
router.use(categoryRouter);
router.use(imageRouter);
router.use(cartRouter);

export default router;
