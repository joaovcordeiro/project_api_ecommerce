import { Router } from "express";
import * as authController from "../controllers/authController.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchema.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { loginSchema, registerSchema } from "../schemas/userSchema.js";

const authRouter = Router();

authRouter.post(
  "/auth/register",
  validateSchemaMiddleware(registerSchema),
  authController.register
);
authRouter.post(
  "/auth/login",
  validateSchemaMiddleware(loginSchema),
  authController.login
);
authRouter.post("/auth/logout", authController.logout);
authRouter.post("/auth/refresh", authController.refresh);

export default authRouter;
