// write tests for login.js
const request = require("supertest");
const Server = require("../models/server");

describe("POST /login", () => {
  let app;
  let server;

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
});
