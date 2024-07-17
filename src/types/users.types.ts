import { Prisma } from "@prisma/client";
import { z } from "zod";

export type UserCreateInput = Omit<Prisma.UserCreateInput, "createdAt">;

export interface IUsersRepository {
  create: (data: UserCreateInput) => void;
  findByEmail: (data: { email: string }) => void;
}

export interface IUsersService {
  signUp: (data: UserCreateInput) => void;
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
