const mongoose = require("mongoose");
const request = require("supertest");

require("dotenv").config();

const app = require("../app");

const { DB_HOST, PORT } = process.env;

const loginUser = {
  email: "test123@gmail.com",
  password: "123456",
};

describe("test login controller", () => {
  let server;
  beforeAll(() => (server = app.listen(PORT)));
  afterAll(() => server.close());

  beforeEach((done) => {
    mongoose.connect(DB_HOST).then(() => done());
  });

  test("login returns 200 status", async () => {
    const response = await request(app).post("/users/login").send(loginUser);
    expect(response.statusCode).toBe(200);
  });
  test("login returns token", async () => {
    const response = await request(app).post("/users/login").send(loginUser);
    expect(response.body.token).toBeDefined();
  });
  test("login returns object with 2 fields - email and subscription", async () => {
    const response = await request(app).post("/users/login").send(loginUser);
    expect(Object.keys(response.body.user).length).toBe(2);
    expect(response.body.user).toBeDefined();
    expect(response.body.user.email).toBe("test123@gmail.com");
    expect(response.body.user.subscription).toBe("starter");
    expect(typeof response.body.user.email).toBe("string");
    expect(typeof response.body.user.subscription).toBe("string");
  });
});
