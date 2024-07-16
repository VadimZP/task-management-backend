import { IUsersService, UserCreateInput } from "@/types/users.types";
import { CustomError } from "@/utils";
import { UsersRepository } from "@/repositories/users.repository";

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

      result = await this.repository.create(data);
    } catch (e) {
      if (e instanceof CustomError) {
        console.log("KEK")
        throw new CustomError(e.message, e.statusCode);
      } else if (e instanceof Error) {
        throw new Error(`signUp failed: ${e.message}`);
      } else {
        throw new Error('signUp failed due to an unknown error');
      }
    }

    return result;
  }
}
