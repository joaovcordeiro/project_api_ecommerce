import Joi from "joi";

import { ProductCreateData } from "../services/productsService";

export const productSchema = Joi.object<ProductCreateData>({
  name: Joi.string().min(3).max(30).required(),
  price: Joi.number().min(0).required(),
  description: Joi.string().min(3).max(30).required(),
  stock: Joi.number().min(0).required(),
  category_id: Joi.number().min(0).required(),
});
