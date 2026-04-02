const { protect } = require("../middleware/authMiddleware");
const allowOnly = require("../middleware/roleMiddleware");
const upload = require("../config/multerConfig");

const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  deleteUserById,
  uploadProfilePic,
} = require("../controllers/userControllers");

router.get("/", protect, allowOnly("admin"), getAllUsers);
router.get("/:id", protect, getUserById);
router.delete("/:id", protect, allowOnly("admin"), deleteUserById);
router.put(
  "/profile/picture",
  protect,
  upload.single("profilePic"),
  uploadProfilePic,
);

module.exports = router;
