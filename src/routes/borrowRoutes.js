const { protect } = require("../middleware/authMiddleware");
const allowOnly = require("../middleware/roleMiddleware");
const express = require("express");
const router = express.Router();
const {
  borrowBook,
  returnBook,
  getAllBorrows,
  getMyBorrows,
} = require("../controllers/borrowControllers");
const { borrowValidator } = require("../validators/borrowValidator");
const validateMiddleware = require("../utils/validateMiddleware");

router.post("/", protect, borrowValidator, validateMiddleware, borrowBook);
router.get("/my", protect, getMyBorrows);
router.get("/", protect, allowOnly("admin"), getAllBorrows);
router.put("/:id/return", protect, returnBook);

module.exports = router;
