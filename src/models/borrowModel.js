const mongoose = require("mongoose");
const User = require("./userModel");
const Book = require("./bookModel");

const borrowSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId, // just the id
      ref: "User", // reference to User model
      required: true,
    },
    book: {
      type: mongoose.Schema.Types.ObjectId, // just the id
      ref: "Book", // reference to Book model
      required: true,
    },
    borrowedAt: {
      type: Date,
      default: Date.now,
    },
    returnedAT: {
      type: Date,
      default: null,
    },
    status: {
      type: String,
      default: "borrowed",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.Model("Borrow", borrowSchema);
