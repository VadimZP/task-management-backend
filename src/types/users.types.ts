import { Prisma } from "@prisma/client";
import { z } from "zod";

export type UserCreateInputRequest = Pick<
  Prisma.UserCreateInput,
  "email" | "nickname" | "password"
>;
export type UserCreateInputRepository = Omit<
  Prisma.UserCreateInput,
  "createdAt" | "emailVerificationCodeCreatedAt"
>;
export type UserFindByEmailAndNicknameRepository = Pick<
  Prisma.UserCreateInput,
  "email" | "nickname"
>;

export type EmailVerificationRequest = Omit<
  Prisma.UserCreateInput,
  "createdAt" | "emailVerificationCodeCreatedAt" | "isActive"
>;
export type EmailVerificationRepository = {
  email: Prisma.UserCreateInput["email"];
};

export type ResetEmailVerificationCodeRequest = Omit<
  Prisma.UserCreateInput,
  "createdAt" | "emailVerificationCodeCreatedAt" | "isActive"
>;
export type ResetEmailVerificationCodeRepository = Pick<
  Prisma.UserCreateInput,
  "email" | "emailVerificationCode" | "emailVerificationCodeCreatedAt"
>;

export interface IUsersRepository {
  create: (data: UserCreateInputRepository) => void;
  findByEmailAndNickname: (data: UserFindByEmailAndNicknameRepository) => void;
  verifyEmail: (data: EmailVerificationRepository) => void;
  resetEmailVerificationCode: (
    data: ResetEmailVerificationCodeRepository,
  ) => void;
}

export interface IUsersService {
  signUp: (data: UserCreateInputRequest) => void;
  verifyEmail: (data: EmailVerificationRequest) => void;
  resetEmailVerificationCode: (data: ResetEmailVerificationCodeRequest) => void;
}

export const SignUpSchema = z.object({
  body: z.object({
    email: z.string().email(),
    nickname: z.string().min(3).max(16),
    password: z
      .string()
      .min(8)
      .max(32)
      .regex(
        new RegExp(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).*$/),
        "Password should contain at least one number, at least one lowercase letter, at least one uppercase letter",
      ),
  }),
});

export const EmailVerificationSchema = z.object({
  body: z.object({
    email: z.string().email(),
    nickname: z.string(),
    password: z.string(),
    emailVerificationCode: z.string(),
  }),
});

export const ResetEmailVerificationCodeSchema = z.object({
  body: z.object({
    email: z.string().email(),
    nickname: z.string(),
    password: z.string(),
  }),
});
