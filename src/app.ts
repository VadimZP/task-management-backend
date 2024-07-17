import express, { Express } from "express";
import { errorHandlerMiddleware } from "@/middlewares";
import { authRouter } from "@routes/signup.router";

export const app: Express = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "hello", statusCode: 200 });
});
app.use(authRouter);

app.use(errorHandlerMiddleware);
