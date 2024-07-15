import express, { Express, NextFunction, Request, Response } from "express";
import {errorHandlerMiddleware} from "@/middlewares";

const app: Express = express();

app.use(express.json());

app.use(errorHandlerMiddleware);

app.get("/", (req, res) => {
  res.json({ message: "hello", statusCode: 200 });
});

app.listen(3000, () => {
  console.log(`App is listening on port 3000`);
});
