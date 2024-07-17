import bcrypt from "bcrypt";
import { IUsersService, UserCreateInput } from "@/types/users.types";
import { CustomError } from "@/utils";
import { UsersRepository } from "@/repositories/users.repository";
// import { ZodError } from "zod";
// import { BadRequestError } from "@utils/custom-error-handler";

export class UsersService implements IUsersService {
  private repository: UsersRepository;

  constructor(repository: UsersRepository) {
    this.repository = repository;
  }

  async signUp(data: UserCreateInput) {
    let result;

    try {
      const foundUser = await this.repository.findByEmail({
        email: data.email,
      });

      if (foundUser?.email === data.email) {
        throw new CustomError("User with this email already exists", 409);
      }

      const saltRounds = 10;
      const password = data.password;

      const hash = await bcrypt.hash(password, saltRounds);

      result = await this.repository.create({
        email: data.email,
        nickname: data.nickname,
        password: hash,
      });
    } catch (e) {
      // if (e instanceof ZodError) {
      //   throw new BadRequestError(e.issues);
      // }
      if (e instanceof CustomError) {
        throw new CustomError(e.message, e.statusCode);
      } else if (e instanceof Error) {
        throw new Error(`signUp failed: ${e.message}`);
      } else {
        throw new Error("signUp failed due to an unknown error");
      }
    }

    return result;
  }
}
