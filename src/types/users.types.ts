import { Prisma } from "@prisma/client";

export type UserCreateInput = Omit<Prisma.UserCreateInput, "createdAt">;

export interface IUsersRepository {
  create: (data: UserCreateInput) => void;
  findByEmail: (data: { email: string }) => void;
}

export interface IUsersService {
  signUp: (data: UserCreateInput) => void;
}
