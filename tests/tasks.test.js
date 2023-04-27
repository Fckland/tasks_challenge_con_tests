const request = require("supertest");
const Server = require("../models/server");
const Task = require("../models/usuario");

describe("Tasks test", () => {
  let app;
  let server;
  let user = {
    mail: "test3@gmail.com",
    password: "12345678",
  };
  let validID = "64481883bcf06b80d9626ac9";
  const rand = Math.random()
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2NDQ3YmE4ZDkxOWNiNWFhN2MyNzM2ZTUiLCJpYXQiOjE2ODI2MTc5NDMsImV4cCI6MTY4MjYzMjM0M30.nd6bV8Du1Pm-3il3WRZHtZTams9bXSWe8tXLFEZH4TE";
  beforeAll(() => {
    server = new Server();
    app = server.app;
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
    // const task = await Task.findOne( {name:"TAREA7"} );
    // const validIDD = task.id;
    // console.log(task);

    const response = await request(app)
      .get(`/tasks/64481883bcf06b80d9626ac9`)
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
      .send({ name: `tareaaaaa${rand}`, description: "Hay que hacer muchas cosas" });
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
     .send({ name: "tareaActualizada", description: "Hay que hacer muchas cosas" });
    expect(response.status).toBe(200);
  });

  // Delete a task
  test("should succesfully delete a task", async () => {
    const response = await request(app)
    .delete(`/tasks/644a6da3a5d4662c335a4b9a`)
    .set("token", `${token}`);
    expect(response.status).toBe(200);
  });
});
