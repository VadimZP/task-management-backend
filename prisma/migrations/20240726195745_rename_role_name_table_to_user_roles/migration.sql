/*
  Warnings:

  - You are about to drop the `role_name` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "role_name";

-- CreateTable
CREATE TABLE "user_roles" (
    "id" INTEGER NOT NULL,
    "roleName" TEXT NOT NULL,

    CONSTRAINT "user_roles_pkey" PRIMARY KEY ("id")
);
