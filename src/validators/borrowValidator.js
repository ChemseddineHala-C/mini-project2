const { body } = require("express-validator");

const borrowValidator = [
  body("bookId")
    .notEmpty()
    .withMessage("Book ID is required")
    .isMongoId()
    .withMessage("Invalid book ID format"),
];

module.exports = { borrowValidator };
