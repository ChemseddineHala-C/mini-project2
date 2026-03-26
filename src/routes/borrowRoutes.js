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

router.post("/", borrowBook);
router.put("/:id/return", returnBook);
router.get("/", getAllBorrows);
router.get("/my", getMyBorrows);

module.exports = router;
