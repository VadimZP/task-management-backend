import { IUsersRepository, UserCreateInput } from "@/types/users.types";
import { prismaClient } from "@/database";

export class UsersRepository implements IUsersRepository {
  private db: typeof prismaClient;
  constructor(db: typeof prismaClient) {
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
