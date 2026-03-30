const { body } = require("express-validator");

const bookValidator = [
  body("title").notEmpty().withMessage("title is required"),

  body("author").notEmpty().withMessage("author is required"),

  body("genre").notEmpty().withMessage("genre is required"),

  body("totalCopies")
    .notEmpty()
    .withMessage("Total copies is required")
    .isInt({ min: 1 })
    .withMessage("Total copies must be at least 1"),

  body("availableCopies")
    .notEmpty()
    .withMessage("Available copies is required")
    .isInt({ min: 0 })
    .withMessage("Available copies con not be negative"),
];

module.exports = { bookValidator };
