import express, { Express } from "express";
import { errorHandlerMiddleware } from "@/middlewares";
import { authRouter } from "@routes/auth.router";

export const app: Express = express();

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ message: "hello", statusCode: 200 });
});
app.use(authRouter);

app.use(errorHandlerMiddleware);
