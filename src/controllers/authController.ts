import { Request, Response } from "express";
import * as authService from "../services/authService.js";

export async function register(req: Request, res: Response) {
  const user: authService.UserCreateData = req.body;

  await authService.registerUser(user);

  return res.status(201).json({ message: "User created" });
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  const tokens = await authService.loginUser(email, password);

  return res.status(200).json({ tokens });
}

export async function logout(req: Request, res: Response) {
  console.log(req.headers);
  const refreshToken = req.headers.authorization?.split(" ")[1];

  res.clearCookie("token", { httpOnly: true });

  if (!refreshToken)
    return res.status(401).json({ message: "Refresh token not provided" });

  await authService.logoutUser(refreshToken);

  return res.status(200).json({ message: "Logged out" });
}

export async function refresh(req: Request, res: Response) {
  const refreshToken = req.headers.authorization?.split(" ")[1];

  if (!refreshToken)
    return res.status(401).json({ message: "Refresh token not provided" });

  const tokens = await authService.refreshToken(refreshToken);

  return res.status(200).json({ tokens });
}
