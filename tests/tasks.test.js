const request = require("supertest");
const Server = require("../models/server");
const Task = require("../models/task");

describe("Tasks test", () => {
  let app;
  let server;
  let user = {
    mail: "test3@gmail.com",
    password: "12345678",
  };
  let validID;
  const rand = Math.random();
  let token;
  beforeAll(async () => {
    server = new Server();
    app = server.app;
    const task = await Task.findOne({ name: "TAREA6" });
    validID = task.id;
    const response = await request(app).post("/login").send(user);
    token = response.body.token;
  });

  afterAll(async () => {
    await server.desconectarDB();
  });

  // Get all tasks
  test("should get all tasks", async () => {
    const response = await request(app).get("/tasks").send(user);

    expect(response.status).toBe(200);
  });

  // Get a task by ID

  test("Should get a task if the taskID is correct and the token is valid", async () => {
    const response = await request(app)
      .get(`/tasks/${validID}`)
      .set("token", `${token}`);

    expect(response.status).toBe(200);
  });

  test("should receive an error to get a task because theres no valid ID", async () => {
    const response = await request(app)
      .get(`/tasks/1234`)
      .set("token", `${token}`);
    expect(response.status).toBe(400);
  });

  // Create a task
  test("should succesfully create a task", async () => {
    const response = await request(app)
      .post("/tasks")
      .set("token", `${token}`)
      .send({
        name: `tareaaaaa${rand}`,
        description: "Hay que hacer muchas cosas",
      });
    expect(response.status).toBe(200);
  });

  test("should receive an error to create a task because the task already exists", async () => {
    const response = await request(app)
      .post("/tasks")
      .set("token", `${token}`)
      .send({ name: "tareaaaaa", description: "Hay que hacer muchas cosas" });
    expect(response.status).toBe(400);
  });

  test("should receive an error to create a task because theres no valid token", async () => {
    const response = await request(app)
      .post("/tasks")
      .set("token", `1234`)
      .send({ name: "tareaaaaa", description: "Hay que hacer muchas cosas" });
    expect(response.status).toBe(401);
  });

  // Update a task
  test("should succesfully update a task", async () => {
    const response = await request(app)
      .put(`/tasks/${validID}`)
      .set("token", `${token}`)
      .send({
        name: "tareaActualizada",
        description: "Hay que hacer muchas cosas",
      });
    expect(response.status).toBe(200);
  });

  // Delete a task
  test("should succesfully delete a task", async () => {
    const response = await request(app)
      .delete(`/tasks/${validID}`)
      .set("token", `${token}`);
    expect(response.status).toBe(200);
  });
});
