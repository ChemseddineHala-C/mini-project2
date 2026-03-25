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

router.post("/", protect, allowOnly("admin", "librarian"), borrowBook);
router.put("/:id/return", protect, returnBook);
router.get("/", protect, allowOnly("admin"), getAllBorrows);
router.get("/my", protect, getMyBorrows);

module.exports = router;
