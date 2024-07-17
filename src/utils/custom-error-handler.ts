import { ZodIssue } from "zod";

export class CustomError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);

    this.message = message;
    this.statusCode = statusCode;
  }
}

export class BadRequestError extends CustomError {
  issues: ZodIssue[];

  constructor(
    issues: ZodIssue[],
    message: string = "Incorrect data supplied",
    statusCode: number = 400,
  ) {
    super(message, statusCode);

    this.message = message;
    this.statusCode = statusCode;
    this.issues = issues;
  }
}
