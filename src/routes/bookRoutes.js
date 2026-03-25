const { protect } = require("../middleware/authMiddleware");
const allowOnly = require("../middleware/roleMiddleware");

const express = require("express");
const router = express.Router();
const {
  getAllBooks,
  getBookById,
  getBooksByGenre,
  getBooksByAuthor,
  postBook,
  updateBookInfo,
  deleteBook,
} = require("../controllers/bookControllers");

router.get("/", protect, getAllBooks);
router.get("/:id", protect, getBookById);
router.get("/genre", protect, getBooksByGenre);
router.get("/author", protect, getBooksByAuthor);
router.post("/", protect, allowOnly("admin"), postBook);
router.put("/:id", protect, allowOnly("admin"), updateBookInfo);
router.delete("/:id", protect, allowOnly("admin"), deleteBook);

module.exports = router;
