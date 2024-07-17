import { NextFunction, Request, Response } from "express";
import { Schema, ZodError } from "zod";

export const validate =
  (schema: Schema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).send(error.issues);
      }
      return res.status(400).send(error);
    }
  };
