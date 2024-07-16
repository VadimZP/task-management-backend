import express, { Request } from "express";
import { UsersService } from "@/services/users.service";
import { UsersRepository } from "@/repositories/users.repository";
import { prismaClient } from "@/database";
import { ROUTSE } from "@/constants";
import { UserCreateInput } from "@/types/users.types";
import { CustomError } from "@utils/custom-error-handler";

export const authRouter = express.Router();

const usersRepository = new UsersRepository(prismaClient);
const usersService = new UsersService(usersRepository);

authRouter.post(
  ROUTSE.SIGN_UP,
  async (req: Request<{}, {}, UserCreateInput>, res, next) => {
    try {
      const result = await usersService.signUp({
        email: req.body.email,
        nickname: req.body.nickname,
        password: req.body.password,
      });

      res.status(201).json({ data: result, message: "User successfully created"})
    } catch (e) {
      next(e)
    }
  },
);
