const { protect } = require("../middleware/authMiddleware");
const allowOnly = require("../middleware/roleMiddleware");

const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  deleteUserById,
} = require("../controllers/userControllers");

router.get("/", protect, allowOnly("admin"), getAllUsers);
router.get("/:id", protect, getUserById);
router.delete("/:id", protect, allowOnly("admin"), deleteUserById);

module.exports = router;
