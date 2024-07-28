import { NextFunction, Request, Response } from "express";

export function handleErrorGlobally(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.error(err.stack);

  const statusCode = err?.statusCode || 500;
  const message = err?.message || "Internal server error";

  res.status(statusCode).json({
    statusCode,
    message,
  });
}
