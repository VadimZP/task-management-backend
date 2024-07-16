import { IUsersRepository, UserCreateInput } from "@/types/users.types";
import { PrismaClient } from "@prisma/client";

export class UsersRepository implements IUsersRepository {
  private db: PrismaClient;
  constructor(db: PrismaClient) {
    this.db = db;
  }

  async create(data: UserCreateInput) {
    return this.db.user.create({ data });
  }

  async findByEmail(data: { email: string }) {
    return this.db.user.findUnique({
      where: {
        email: data.email,
      },
    });
  }
}
