-- AlterTable
ALTER TABLE "users" ADD COLUMN     "emailVerificationCode" TEXT DEFAULT 'test',
ADD COLUMN     "emailVerificationCodeCreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
