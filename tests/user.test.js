const request = require("supertest");
const User = require("../models/usuario");
const Server = require("../models/server");

describe("Tasks test", () => {
  let app;
  let server;
  let rand = Math.random();
  let user = {
    name: `test${rand}`,
    mail: `test${rand}@example.com`,
    password: "testpassword",
  };
  let validID;
  let token;
  beforeAll(async () => {
    server = new Server();
    app = server.app;
    const userID = await User.findOne({ name: "test1" });
    validID = userID.id;
    const response = await request(app).post("/login").send(user);
    token = response.body.token;
  });

  afterAll(async () => {
    await server.desconectarDB();
  });

  // Should test the general Get to get all the users
  it("Should get all the users", async () => {
    const response = await request(app).get("/users");
    expect(response.status).toBe(200);
    // expect(response.body.length).toBeGreaterThan(0);
  });

  // Should test the general Get to get a specific user with a validID
  it("Should get a specific user with a validID", async () => {
    const response = await request(app).get(`/users/${validID}`);
    expect(response.status).toBe(200);
    // expect(response.body.id).toBe(validID);
  });

  // Should test the general Post to create a new user (if user doesn't exists)
  it("Should create a new user", async () => {
    const response = await request(app).post("/users").send(user);
    expect(response.status).toBe(200);
    // expect(response.body.id).toBeGreaterThan(0);
  });

  // Should test the Put to update a specific user with a validID
  it("Should update a specific user with a validID", async () => {
    const response = await request(app)
    .put(`/users/${validID}`)
    .set("token", `${token}`)
    .send({
      name: `Testing the put number ${rand}`
    });
    expect(response.status).toBe(200);

  });

  // Should test the Delete route to delete an user
  it("Should delete an user", async () => {
    const response = await request(app)
   .delete(`/users/${validID}`)
   .set("token", `${token}`);
    expect(response.status).toBe(200);

  });
});
