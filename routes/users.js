const { Router } = require("express");
const { check } = require("express-validator");
const validation = require("../middlewares/validation");
const { userOrMailExists } = require("../middlewares/custom_check");

const {
  getUsers,
  getUserId,
  postUsers,
  putUsers,
  deleteUsers,
} = require("../controllers/users");
const jwt_validator = require("../middlewares/jwt_validation");

const router = Router();

router.get("/", getUsers);

/**
   * The user should have the following fields:
  name: The name of the user (required).
  email: The email address of the user (required, must be a valid email format).
  password: The password for the user (required, must be at least 8 characters long).
  */
router.post(
  "/",
  [
    check("name", "Name required").not().isEmpty(),
    check("mail", "Email required").not().isEmpty(),
    check("mail", "Email not valid").isEmail(),
    check("password", "Password required").not().isEmpty(),
    check("password", "Password too short, min 8 char").isLength({ min: 8 }),
    userOrMailExists,
    validation,
  ],
  postUsers
);

router.get(
  "/:id",
  [
    check("id", "ID required").not().isEmpty(),
    check("id", "ID not valid").isMongoId(),
    validation,
  ],
  getUserId
);

router.put(
  "/:id",
  [
    jwt_validator,
    check("id", "ID required").not().isEmpty(),
    check("id", "ID not valid").isMongoId(),
    
    validation,
  ],
  putUsers
);

router.delete(
  "/:id",
  [
    jwt_validator,
    check("id", "ID required").not().isEmpty(),
    check("id", "ID not valid").isMongoId(),
    validation,
  ],
  deleteUsers
);

module.exports = router;
