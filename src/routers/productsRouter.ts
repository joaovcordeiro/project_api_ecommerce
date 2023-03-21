import { Router } from "express";
import { validateSchemaMiddleware } from "../middlewares/validateSchema.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const productRouter = Router();

// productRouter.post(
//   "/auth/register",
//   validateSchemaMiddleware(registerSchema),
//   authController.register

// export default authRouter;
