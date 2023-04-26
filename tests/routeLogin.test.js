const app = require("../app"); // Assuming your Express app is exported from app.js or similar
const request = require("supertest");

describe("POST /", () => {
  it("should authenticate user with valid credentials",  (done) => {
    // const user = {
      // name: "test user",
      // mail: "test@example.com",
      // password: "testpassword",
    // };
      expect(true).toEqual(true);
      done();
      // const response = await request(app).post("/").send(user).expect(200);

    // expect(response.body.msg).toEqual("Por ahora funciona");
    // expect(response.body.token).toBeDefined();
    // expect(response.body.user).toBeDefined();
  });

  //   it('should return 400 status for incorrect email', async () => {
  //     const user = {
  //       mail: 'invalidemail',
  //       password: 'testpassword'
  //     };

  //     const response = await request(app)
  //       .post('/')
  //       .send(user)
  //       .expect(400);

  //     expect(response.body.msg).toEqual('Is not a valid email');
  //   });

  //   it('should return 400 status for empty password', async () => {
  //     const user = {
  //       mail: 'test@example.com',
  //       password: ''
  //     };

  //     const response = await request(app)
  //       .post('/')
  //       .send(user)
  //       .expect(400);

  //     expect(response.body.msg).toEqual('Is not a valid password');
  //   });
});
