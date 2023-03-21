import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError.js";

interface CustomRequest extends Request {
  userId?: string;
}

export function authMiddleware(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    throw new AppError("Token not provided", 401);
  }

  try {
    if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET not found");
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload & {
      id: string;
    };
    req.userId = decoded.id;
    next();
  } catch (err) {
    throw new AppError("Invalid token", 401);
  }
}
