const User = require("../models/userModel");
const AppError = require("../utils/AppError");
const asyncHandler = require("../utils/asyncHandler");
// get all users
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password");
  res.status(200).json(users);
});

// get one user by id
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (!user) throw new AppError("User not found", 404);
  res.status(200).json(user);
});

// delete one user by id
const deleteUserById = async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) throw new AppError("User not found", 404);
  res.status(200).json({ message: "User deleted successfully" });
};

const uploadProfilePic = asyncHandler(async (req, res) => {
  // multer puts file info in req.file
  if (!req.file) {
    throw new AppError("Please upload a file", 400);
  }

  // Build file URL
  const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

  // Update user profilePic in DB
  const user = await User.findByIdAndUpdate(
    req.user.id,
    { profilePic: fileUrl },
    { new: true },
  ).select("-password");

  if (!user) throw new AppError("User not found", 404);

  res.status(200).json({
    message: "Profile picture uploaded successfully",
    profilePic: fileUrl,
    user,
  });
});

module.exports = { getAllUsers, getUserById, deleteUserById, uploadProfilePic };
