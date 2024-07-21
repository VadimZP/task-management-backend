import {
  EmailVerificationRepository,
  IUsersRepository,
  ResetEmailVerificationCodeRepository,
  SignInRepository,
  UserCreateInputRepository,
} from "@/types/users.types";
import { prismaClient } from "@/database";

export class UsersRepository implements IUsersRepository {
  private db: typeof prismaClient;
  constructor(db: typeof prismaClient) {
    this.db = db;
  }

  async create(data: UserCreateInputRepository) {
    return this.db.user.create({ data });
  }

  async findByEmailAndNickname(data: { email: string; nickname: string }) {
    return this.db.user.findFirst({
      where: {
        OR: [{ email: data.email }, { nickname: data.nickname }],
      },
    });
  }

  async verifyEmail(data: EmailVerificationRepository) {
    return await this.db.user.update({
      where: {
        email: data.email,
      },
      data: {
        emailVerificationCode: null,
        emailVerificationCodeCreatedAt: null,
        isActive: true,
      },
    });
  }

  async resetEmailVerificationCode(data: ResetEmailVerificationCodeRepository) {
    return await this.db.user.update({
      where: {
        email: data.email,
      },
      data: {
        emailVerificationCode: data.emailVerificationCode,
        emailVerificationCodeCreatedAt: data.emailVerificationCodeCreatedAt,
      },
    });
  }


  async signIn(data: SignInRepository) {
    return await this.db.user.findUnique({
      where: {
        email: data.email,
      },
    });
  }
}
