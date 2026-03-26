const { protect } = require("../middleware/authMiddleware");
const allowOnly = require("../middleware/roleMiddleware");

const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  deleteUserById,
} = require("../controllers/userControllers");

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.delete("/:id", deleteUserById);

module.exports = router;
