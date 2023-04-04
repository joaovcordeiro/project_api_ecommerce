import Joi from "joi";

import { ImageCreateData } from "../services/imageService";

export const imageSchema = Joi.object<ImageCreateData>({
  url: Joi.string().min(3).required(),
  product_id: Joi.number().min(0).required(),
});
