import Joi from "joi";

import { CartCreateData } from "../services/cartService";

export const cartSchema = Joi.object<CartCreateData>({
  product_id: Joi.number().required(),
  quantity: Joi.number().required(),
  price: Joi.number().required(),
});
