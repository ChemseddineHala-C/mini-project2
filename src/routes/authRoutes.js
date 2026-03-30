const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authControllers");
const {
  registerValidator,
  loginValidator,
} = require("../validators/authValidator");
const validateMiddleware = require("../utils/validateMiddleware");

router.post("/register", registerValidator, validateMiddleware, register);
router.post("/login", loginValidator, validateMiddleware, login);

module.exports = router;
