// write tests for login.js
const request = require("supertest");
const Server = require("../models/server");

describe("POST /login", () => {
  let app;
  let server;
  const errors = [
    {
      type: "field",
      msg: "Email required",
      path: "mail",
      location: "body",
    },
    {
      type: "field",
      msg: "Is not a valid email",
      path: "mail",
      location: "body",
    },
  ];

  beforeAll(() => {
    server = new Server();
    app = server.app;
  });

  afterAll(async () => {
    await server.desconectarDB();
  });

  test("Should work fine because the user exists", async () => {
    const user = {
      mail: "test3@gmail.com",
      password: "12345678",
    };
    const response = await request(app).post("/login").send(user);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        token: expect.any(String),
      })
    );
  });
  test("Should respond with a message of incorrect password", async () => {
    const user = {
      mail: "test3@gmail.com",
      password: "12345670",
    };
    const response = await request(app).post("/login").send(user);

    expect(response.status).toBe(400);
    expect(response.body).toEqual(
      expect.objectContaining({
        msg: "Contraseña incorrecta",
      })
    );
  });
  test("Should respond with a message user not found", async () => {
    const user = {
      mail: "test@gmail.com",
      password: "12345678",
    };
    const response = await request(app).post("/login").send(user);

    expect(response.status).toBe(400);
    expect(response.body).toEqual(
      expect.objectContaining({
        msg: "Usuario no encontrado",
      })
    );
  });
  test("Should respond with a message Is not a valid email", async () => {
    const user = {
      mail: "testgmail.com",
      password: "12345678",
    };
    const response = await request(app).post("/login").send(user);

    expect(response.status).toBe(400);
    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ msg: "Is not a valid email" }),
      ])
    );
  });
  test("Should respond with a message Empty password", async () => {
    const user = {
      mail: "testgmail.com",
    };
    const response = await request(app).post("/login").send(user);

    expect(response.status).toBe(400);
    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ msg: "Empty password" }),
      ])
    );
  });
  test("Should respond with a message Email required", async () => {
    const user = {
      password: "12345678",
    };
    const response = await request(app).post("/login").send(user);

    expect(response.status).toBe(400);

    expect(response.body).toEqual(
      expect.objectContaining({
        errors,
      })
    );
  });
});
