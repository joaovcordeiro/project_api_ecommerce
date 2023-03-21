import { ObjectSchema } from "joi";
import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError.js";

export function validateSchemaMiddleware(schema: ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const validation = schema.validate(req.body);
    if (validation.error) {
      console.log(validation.error.details);
      throw new AppError(
        validation.error.details.map((i) => i.message).join(", "),
        422
      );
    }

    next();
  };
}
