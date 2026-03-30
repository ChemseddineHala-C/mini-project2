const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const AppError = require("../utils/AppError");
const asyncHandler = require("../utils/asyncHandler");
const SECRET = process.env.JWT_SECRET;

//creat token
const createToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email, role: user.role }, SECRET);
};

//register's operation
const register = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  const existingEmail = await User.findOne({ email: email });
  if (existingEmail) throw new AppError("Email already registred");

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    name: name,
    email: email,
    password: hashPassword,
    role: role,
  });

  const token = createToken(newUser);

  return res.status(201).json({
    message: "User registered successfully",
    token: token,
    user: { name: newUser.name, email: newUser.email, role: newUser.role },
  });
});

// login's operation
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });
  if (!user) throw new AppError("Invalid email or password", 401);

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) throw new AppError("Invalid email or password", 401);

  const token = createToken(user);

  res.status(200).json({
    message: "Login successful",
    token: token,
    user: { id: user._id, name: user.name, email: user.email },
  });
});

module.exports = { register, login };
