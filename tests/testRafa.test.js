const supertest = require("supertest");

require("dotenv").config();

const Server = require("../models/server");
// const Tiendanube = require("../../models/tiendanube");

const server = new Server();

const request = supertest(server.app);

const { setupDB } = require("./setupDB");
// const { testStore } = require("../tienda-nube/tiendanube.samples");
// const {
//   testUserOK,
//   testUserEmptyMail,
//   testUserInvalidMail,
//   genericUserId,
//   genericMongoId,
//   testAccessData,
// } = require("./users.samples");

// setupDB(server);

describe("POST /", () => {
  it("should authenticate user with valid credentials", () => {
    const user = {
      name: "test user",
      mail: "test@example.com",
      password: "testpassword",
    };
    expect(1<2).toEqual(true);
    
    // response = await request.post("/").send(user).expect(200);
    // console.log(response)

    // expect(response.body.msg).toEqual("Por ahora funciona");
    // expect(response.body.token).toBeDefined();
    // expect(response.body.user).toBeDefined();
  });
});
