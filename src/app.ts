import express, { Express } from "express";
import session from "express-session";
import { createClient } from "redis";
import RedisStore from "connect-redis";

import { errorHandlerMiddleware } from "@/middlewares";
import { authRouter } from "@routes/auth.router";

export const app: Express = express();

app.use(express.json());

let redisClient = createClient({
  url: "redis://default:root@localhost:6379",
});
redisClient
  .connect()
  .catch((e) => console.error(`Redis connection failed: ${e}`));

let redisStore = new RedisStore({
  client: redisClient,
});

app.use(
  session({
    store: redisStore,
    resave: false,
    saveUninitialized: false,
    secret: "coconut crab",
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1000 * 60 * 10,
    },
  }),
);

app.get("/", (_req, res) => {
  res.json({ message: "hello", statusCode: 200 });
});

app.use(authRouter);

app.use(errorHandlerMiddleware);
