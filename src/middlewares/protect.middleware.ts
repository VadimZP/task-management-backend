import { NextFunction, Request, Response } from "express";

export function protect(req: Request, res: Response, next: NextFunction) {
  // @ts-ignore
  if (req.session == null || req.session.user == null) {
    return res.status(500).json("Session error");
  }

  // @ts-ignore
  if (!req.session.user.isActive) {
    return res
      .status(401)
      .json(
        "Only accounts with verified email are allowed to perform this action",
      );
  }

  // @ts-ignore
  if (req.session.user.isActive) {
    next();
  } else {
    res.status(401).json("Not authorized for this action");
  }
}
