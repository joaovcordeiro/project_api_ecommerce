/*
  Warnings:

  - You are about to drop the `failed_login` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "failed_login";

-- CreateTable
CREATE TABLE "failed_login_attempt" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "date" TEXT NOT NULL,

    CONSTRAINT "failed_login_attempt_pkey" PRIMARY KEY ("id")
);
