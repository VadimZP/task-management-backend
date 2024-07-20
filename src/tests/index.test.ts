import supertest from "supertest";

// import * from "supertest";
// const app = require("../../src/app");

import { app } from "../app";

describe("Test the root path", () => {
  test("It should response the GET method", async () => {
    const response = await supertest(app).get("/");
    expect(response.statusCode).toBe(200);
  });
});
