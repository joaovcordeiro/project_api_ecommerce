import { UserCreateData } from "../services/authService";
import { prisma } from "../config/database.js";

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  failed_attempts: number;
  blocked_until: Date;
  refresh_token: string;
}

export async function insert(User: UserCreateData, hashedPassword: string) {
  await prisma.user.create({
    data: {
      name: User.name,
      email: User.email,
      password: hashedPassword,
      failed_attempts: 0,
    },
  });
}

export async function verifyEmail(email: string) {
  return await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
}

export async function verifyUserId(userId: number) {
  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
}

export async function incrementFailedLoginAttempts(userId: number) {
  await prisma.user.update({
    where: { id: userId },
    data: { failed_attempts: { increment: 1 } },
  });
}

export async function resetFailedAttempts(userId: number) {
  await prisma.user.update({
    where: { id: userId },
    data: { failed_attempts: 0 },
  });
}

export async function setBlockUntil(userId: number, blockedUntil: Date) {
  await prisma.user.update({
    where: { id: userId },
    data: { blocked_until: blockedUntil },
  });
}

export async function resetBlockedUntil(userId: number) {
  await prisma.user.update({
    where: { id: userId },
    data: { blocked_until: null },
  });
}

export async function setRefreshToken(userId: number, refreshToken: string) {
  await prisma.user.update({
    where: { id: userId },
    data: { refresh_token: refreshToken },
  });
}

export async function verifyRefreshToken(userId: number, refreshToken: string) {
  return await prisma.user.findFirst({
    where: {
      id: userId,
      refresh_token: refreshToken,
    },
  });
}

export async function deleteRefreshToken(userId: number) {
  await prisma.user.update({
    where: { id: userId },
    data: { refresh_token: null },
  });
}
