import bcrypt from "bcrypt";
import crypto from "crypto";
import nodemailer from "nodemailer";
import dayjs from "dayjs";

import {
  EmailVerificationRequest,
  IUsersService,
  ResetEmailVerificationCodeRequest,
  UserCreateInputRequest,
} from "@/types/users.types";
import { CustomError, handleError } from "@/utils";
import { UsersRepository } from "@/repositories/users.repository";


export class UsersService implements IUsersService {
  private repository: UsersRepository;

  constructor(repository: UsersRepository) {
    this.repository = repository;
  }

  async signUp(data: UserCreateInputRequest) {
    let result;

    try {
      const foundUser = await this.repository.findByEmailAndNickname({
        email: data.email,
        nickname: data.nickname,
      });

      if (foundUser?.email === data.email) {
        throw new CustomError("User with this email already exists", 409);
      }

      if (foundUser?.nickname === data.nickname) {
        throw new CustomError("User with this nickname already exists", 409);
      }

      const password = data.password;

      const saltRounds = 10;
      const hash = await bcrypt.hash(password, saltRounds);

      const emailVerificationCode = crypto.randomBytes(3).toString("hex");

      const transporter = nodemailer.createTransport({
        service: "Gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: "dev634556@gmail.com",
          pass: "lkgk nuyt lzjc bldx",
        },
      });

      await transporter.sendMail({
        from: "dev634556@gmail.com",
        to: data.email,
        subject: "Email Confirmation",
        text: "Confirm your email with this code",
        html: `<b>Verification code: ${emailVerificationCode}</b>`,
      });

      result = await this.repository.create({
        email: data.email,
        nickname: data.nickname,
        password: hash,
        emailVerificationCode,
      });
    } catch (e) {
      handleError(e);
    }

    return result;
  }

  async verifyEmail(data: EmailVerificationRequest) {
    try {
      const foundUser = await this.repository.findByEmailAndNickname({
        email: data.email,
        nickname: data.nickname,
      });

      if (
        foundUser?.email !== data.email ||
        foundUser?.nickname !== data.nickname
      ) {
        throw new CustomError("Incorrect credentials provided", 401);
      }

      const isPasswordMatch = await bcrypt.compare(
        data.password,
        foundUser!.password,
      );

      if (!isPasswordMatch) {
        throw new CustomError("Incorrect credentials provided", 401);
      }

      if (foundUser.isActive) {
        throw new CustomError("User is already verified", 400)
      }

      const isEmailVerificationCodeMatch =
        data.emailVerificationCode === foundUser!.emailVerificationCode;

      if (!isEmailVerificationCodeMatch) {
        throw new CustomError("Incorrect verification code", 401);
      }

      if (!foundUser?.emailVerificationCodeCreatedAt) {
        throw new Error("Something went wrong with verification code");
      };

      const dateOfEmailVerificationCodeCreation = dayjs(foundUser!.emailVerificationCodeCreatedAt.toISOString());
      const currentDate = dayjs();
      const diffInMinutes = currentDate.diff(dateOfEmailVerificationCodeCreation, 'minute');
      const isEmailVerificationCodeExpired = diffInMinutes >= 1

      if (isEmailVerificationCodeExpired) {
        throw new CustomError('Email verification code has expired', 410);
      }

      const { email, nickname } = await this.repository.verifyEmail({ email: data.email })

      return { email, nickname };
    } catch (e) {
      handleError(e);
    }
  }

  async resetEmailVerificationCode(data: ResetEmailVerificationCodeRequest) {
    const foundUser = await this.repository.findByEmailAndNickname({
      email: data.email,
      nickname: data.nickname,
    });

    if (
      foundUser?.email !== data.email ||
      foundUser?.nickname !== data.nickname
    ) {
      throw new CustomError("Incorrect credentials provided", 401);
    }

    const isPasswordMatch = await bcrypt.compare(
      data.password,
      foundUser!.password,
    );

    if (!isPasswordMatch) {
      throw new CustomError("Incorrect credentials provided", 401);
    }

    if (foundUser.isActive) {
      throw new CustomError("User is already verified", 400)
    }

    const emailVerificationCode = crypto.randomBytes(3).toString("hex");

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "dev634556@gmail.com",
        pass: "lkgk nuyt lzjc bldx",
      },
    });

    await transporter.sendMail({
      from: "dev634556@gmail.com",
      to: data.email,
      subject: "Email Confirmation",
      text: "Confirm your email with this code",
      html: `<b>Verification code: ${emailVerificationCode}</b>`,
    });

    const currentDateISO = dayjs().toISOString()

    await this.repository.resetEmailVerificationCode({
      email: data.email,
      emailVerificationCode,
      emailVerificationCodeCreatedAt: currentDateISO
    })

    return null;
  }
}
