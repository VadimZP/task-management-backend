import express, { Request, Response } from "express";

import { AuthService } from "@/services/auth.service";
import { AuthRepository } from "@/repositories/auth.repository";
import { prismaClient } from "@/database";
import { ROUTES } from "@/utils/constants";
import {
  SignUpRequest,
  SignUpSchema,
  EmailVerificationRequest,
  EmailVerificationSchema,
  ResetEmailVerificationCodeSchema,
  SignInSchema,
  SignInRequest,
} from "@/types/auth.types";
import { validate } from "@/middlewares";

export const authRouter = express.Router();

const authRepository = new AuthRepository(prismaClient);
const authService = new AuthService(authRepository);

authRouter.post(
  ROUTES.SIGN_UP,
  validate(SignUpSchema),
  async (req: Request<{}, {}, SignUpRequest>, res: Response, next) => {
    try {
      const result = await authService.signUp({
        email: req.body.email,
        nickname: req.body.nickname,
        password: req.body.password,
      });

      res
        .status(201)
        .json({ data: result, message: "User successfully created" });
    } catch (e) {
      next(e);
    }
  },
);

authRouter.patch(
  ROUTES.EMAIL_VERIFICATION,
  validate(EmailVerificationSchema),
  async (
    req: Request<{}, {}, EmailVerificationRequest>,
    res: Response,
    next,
  ) => {
    try {
      const result = await authService.verifyEmail({
        email: req.body.email,
        nickname: req.body.nickname,
        password: req.body.password,
        emailVerificationCode: req.body.emailVerificationCode,
      });

      res
        .status(201)
        .json({ data: result, message: "User successfully verified email" });
    } catch (e) {
      next(e);
    }
  },
);

authRouter.patch(
  ROUTES.RESET_EMAIL_VERIFICATION,
  validate(ResetEmailVerificationCodeSchema),
  async (
    req: Request<{}, {}, EmailVerificationRequest>,
    res: Response,
    next,
  ) => {
    try {
      const result = await authService.resetEmailVerificationCode({
        email: req.body.email,
        nickname: req.body.nickname,
        password: req.body.password,
      });

      res.status(201).json({
        data: result,
        message: "New verification code sent to your email",
      });
    } catch (e) {
      next(e);
    }
  },
);

authRouter.post(
  ROUTES.SIGN_IN,
  validate(SignInSchema),
  async (req: Request<{}, {}, SignInRequest>, res: Response, next) => {
    try {
      const result = await authService.signIn({
        email: req.body.email,
        password: req.body.password,
      });

      const session = req.session;

      // @ts-ignore
      session.user = {
        id: result.id,
        email: result.email,
        nickname: result.nickname,
        isActive: result.isActive,
      };

      res.status(201).json({
        data: result,
        message: "Successfully signed in",
      });
    } catch (e) {
      next(e);
    }
  },
);

authRouter.post(
  ROUTES.SIGN_OUT,
  async (req: Request<{}, {}, SignInRequest>, res: Response, next) => {
    try {
      req.session.destroy((err) => {
        if (err) {
          return next(err.message);
        }

        res.sendStatus(204);
      });
    } catch (e) {
      next(e);
    }
  },
);

authRouter.get(ROUTES.SESSION, (req, res) => {
  // @ts-ignore
  if (req.session && req.session.user) {
    res.json({ isAuthenticated: true });
  } else {
    res.json({ isAuthenticated: false });
  }
});
