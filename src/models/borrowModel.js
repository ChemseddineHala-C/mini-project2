const mongoose = require("mongoose");

const borrowSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    borrowedAt: {
      type: Date,
      default: Date.now,
    },
    returnedATt: {
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

module.exports = mongoose.model("Borrow", borrowSchema);
