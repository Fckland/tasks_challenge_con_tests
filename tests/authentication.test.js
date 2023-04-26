const bcrypt = require("bcryptjs");
const User = require("../models/usuario"); // Assuming User model is imported
const generateJWT = require("../helpers/jwt_generate"); // Assuming generateJWT function is available
const authentication = require("../controllers/authentication"); // Assuming authentication controller is defined in separate file
// const jest = require('jest'); // Import Jest

describe("Authentication Controller", () => {
  // Mock request and response objects
  let req;
  let res;

  beforeEach(() => {
    req = {
      body: {
        mail: "test@example.com",
        password: "password123",
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return error with status 400 if user not found", async () => {
    User.findOne = jest.fn().mockResolvedValue(null);

    await authentication(req, res);

    expect(User.findOne).toHaveBeenCalledWith({ mail: req.body.mail });
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      msg: "Usuario no encontrado",
    });
  });

  it("should return error with status 400 if password is incorrect", async () => {
    const mockUser = {
      _id: "1234567890",
      password: bcrypt.hashSync("testpassword", 10),
    };
    User.findOne = jest.fn().mockResolvedValue(mockUser);
    bcrypt.compareSync = jest.fn().mockReturnValue(false);

    await authentication(req, res);

    expect(User.findOne).toHaveBeenCalledWith({ mail: req.body.mail });
    expect(bcrypt.compareSync).toHaveBeenCalledWith(
      req.body.password,
      mockUser.password
    );
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      msg: "Contraseña incorrecta",
    });
  });

  it("should return token and user id if authentication is successful", async () => {
    const mockUser = {
      mail: "test@example.com",
      //   password: bcrypt.hashSync('testpassword', 10),
      password: "testpassword",
    };
    User.findOne = jest.fn().mockResolvedValue(mockUser);
    bcrypt.compareSync = jest.fn().mockReturnValue(true);
    // generateJWT = jest.fn().mockResolvedValue('mockToken');
    const generarJWT = generateJWT(jest.fn().mockResolvedValue("mockToken"));

    await authentication(req, res);

    expect(User.findOne).toHaveBeenCalledWith({ mail: req.body.mail });
    expect(bcrypt.compareSync).toHaveBeenCalledWith(
      req.body.password,
      mockUser.password
    );
    expect(generarJWT).toHaveBeenCalledWith(mockUser.mail);
    expect(res.json).toHaveBeenCalledWith({
      msg: "Por ahora funciona",
      token: "mockToken",
      user: mockUser.mail,
    });
  });
});
