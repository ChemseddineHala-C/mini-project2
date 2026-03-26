const { protect } = require("../middleware/authMiddleware");
const allowOnly = require("../middleware/roleMiddleware");

const express = require("express");
const router = express.Router();
const {
  getAllBooks,
  getBookById,
  getBooksByFilter,
  postBook,
  updateBookInfo,
  deleteBook,
} = require("../controllers/bookControllers");

router.get("/", getAllBooks);
router.get("/:id", getBookById);
router.get("/search", getBooksByFilter);
router.post("/", postBook);
router.put("/:id", updateBookInfo);
router.delete("/:id", deleteBook);

module.exports = router;
