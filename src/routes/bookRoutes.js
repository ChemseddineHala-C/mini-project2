const { protect } = require("../middleware/authMiddleware");
const allowOnly = require("../middleware/roleMiddleware");
const express = require("express");
const router = express.Router();
const {
  getAllBooks,
  getBookById,
  postBook,
  updateBookInfo,
  deleteBook,
} = require("../controllers/bookControllers");
const { bookValidator } = require("../validators/bookValidator");
const validateMiddleware = require("../utils/validateMiddleware");

router.get("/", protect, getAllBooks);
router.get("/:id", protect, getBookById);
router.post(
  "/",
  protect,
  allowOnly("admin"),
  bookValidator,
  validateMiddleware,
  postBook,
);
router.put("/:id", protect, allowOnly("admin"), updateBookInfo);
router.delete("/:id", protect, allowOnly("admin"), deleteBook);

module.exports = router;
