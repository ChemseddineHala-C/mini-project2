const mongoose = require("mongoose");
const User = require("./userModel");
const Book = require("./bookModel");

const borrowSchema = new mongoose.Schema(
  {
    user: User,
    book: Book,
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
