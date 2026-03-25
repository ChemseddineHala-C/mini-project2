const express = require("express");
const router = express().router;
const {
  getAllUsers,
  getUserById,
  deleteUserById,
} = require("../controllers/userControllers");

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.delete("/:id", deleteUserById);

module.exports = router;
