const express = require("express");
const router = express().router;
const {
  getAllBooks,
  getBookById,
  getBooksByGenre,
  getBooksByAuthor,
  postBook,
  updateBookInfo,
  deleteBook,
} = require("../controllers/bookControllers");

router.get("/", getAllBooks);
router.get("/:id", getBookById);
router.get("?genre=", getBooksByGenre);
router.get("?author=", getBooksByAuthor);
router.post("/", postBook);
router.put("/:id", updateBookInfo);
router.delete("/:id", deleteBook);

module.exports = router;
