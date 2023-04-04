import Joi from "joi";

import { CategoryCreateData } from "../services/categoryService.js";

export const categorySchema = Joi.object<CategoryCreateData>({
  name: Joi.string().min(3).max(30).required(),
  description: Joi.string().min(3).max(30).required(),
});
