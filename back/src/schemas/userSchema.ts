import Joi from "joi";

import { UserCreateData } from "../services/authService";

export const registerSchema = Joi.object<UserCreateData>({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(30).required(),
});

export const loginSchema = Joi.object<UserCreateData>({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(30).required(),
});
