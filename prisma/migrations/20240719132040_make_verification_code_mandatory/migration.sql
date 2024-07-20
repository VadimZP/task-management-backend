/*
  Warnings:

  - Made the column `emailVerificationCode` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "users" ALTER COLUMN "emailVerificationCode" SET NOT NULL,
ALTER COLUMN "emailVerificationCode" DROP DEFAULT;
