const mongoose = require("mongoose");
const request = require("supertest");
require("dotenv").config();

const app = require("../app");
const { User } = require("../models/user");

const { DB_HOST, PORT } = process.env;

describe("", () => {
  let server;
  beforeAll(() => (server = app.listen(PORT)));
  afterAll(() => server.close());

  beforeEach((done) => {
    mongoose.connect(DB_HOST).then(() => done());
  });

  test("test login route", async () => {
    const newUser = {
      email: "test123@gmail.com",
      password: "123456",
      subscroption: "starter",
      avatarURL: "avatars\\64b1858bbe7fe77c18bd5ea5_avatar.jpg",
    };

    const user = await User.create(newUser);

    const loginUser = {
      email: "test123@gmail.com",
      password: "123456",
    };

    const response = await request(app).post("/users/login").send(loginUser);
    expect(response.statusCode).toBe(200);
    const { body } = response;
    expect(body.token).toByTruthy();
    const { token } = await User.findById(user._id);
    expect(body.token).toBe(token);
  });
});
