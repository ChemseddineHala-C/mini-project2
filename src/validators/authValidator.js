const { body } = require("express-validator");

const registerValidator = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters"),

  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 symbols"),

  body("role")
    .notEmpty()
    .withMessage("Role is required")
    .isIn(["admin", "librarian"])
    .withMessage("Age must be between"),
];

const loginValidator = [
  body("email")
    .notEmpty()
    .withMessage("Email are required")
    .isEmail()
    .withMessage("Invalid email format"),

  body("password").notEmpty().withMessage("Password is required"),
];

module.exports = { registerValidator, loginValidator };
