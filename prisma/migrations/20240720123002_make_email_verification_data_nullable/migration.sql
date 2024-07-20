-- AlterTable
ALTER TABLE "users" ALTER COLUMN "emailVerificationCode" DROP NOT NULL,
ALTER COLUMN "emailVerificationCodeCreatedAt" DROP NOT NULL;
