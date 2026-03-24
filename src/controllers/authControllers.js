const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

const SECRET = "chamsuu";

const createToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email, role: user.role }, SECRET);
};

const register = async (req, res) => {
  try {
    const { name, email, passowrd, role } = req.body;

    if (!name || !email || !passowrd || !role) {
      return res.status(400).json({ message: "all fields are required" });
    }

    const existingEmail = await User.findOne({ email });
    if (!existingEmail) {
      return res.status(400).json({ message: "email already registred" });
    }

    const hashPassword = bcrypt.hash(passowrd, 10);

    const newUser = User.create({
      name,
      email,
      passowrd: hashPassword,
      role,
    });

    const token = createToken(newUser);

    return res.status(401).json({
      message: "User registered successfully",
      token,
      user: { name: newUser.name, email: newUser.email, role: newUser.email },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
