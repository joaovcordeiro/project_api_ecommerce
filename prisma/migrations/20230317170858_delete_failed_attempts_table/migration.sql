/*
  Warnings:

  - You are about to drop the `failed_login_attempt` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `failed_attempts` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "failed_attempts" INTEGER NOT NULL;

-- DropTable
DROP TABLE "failed_login_attempt";
