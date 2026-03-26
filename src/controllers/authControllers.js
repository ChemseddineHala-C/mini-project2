const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

const SECRET = "chamsuu";

//creat token
const createToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email, role: user.role }, SECRET);
};

//register's operation
const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "all fields are required" });
    }

    const existingEmail = await User.findOne({ email: email });
    if (existingEmail) {
      return res.status(400).json({ message: "email already registered" });
    }

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
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// login's operation
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = createToken(user);

    res.status(200).json({
      message: "Login successful",
      token: token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { register, login };
