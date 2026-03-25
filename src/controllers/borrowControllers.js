const Borrow = require("../models/borrowModel");
const Book = require("../models/bookModel");
const User = require("../models/userModel");

//borrow a book
const borrowBook = async (req, res) => {
  try {
    const book = await Book.findById(req.body.bookId);
    if (!book) {
      res.status(404).json({ message: "book not found" });
    }
    if (book.avaibleCopies <= 0) {
      res.status(500).json({ message: "it's not avaible" });
    }
    const newBorrow = await create(req.user.id, req.body.bookId);
    const decrease = await Book.findByIdAndUpdate(
      req.body.bookId,
      { $inc: { avaibleCopies: -1 } },
      { new: true },
    );
    if (!decrease) {
      res.status(500).json({ message: "Operation hasn't done" });
    }
    res.status(200).json(newBorrow);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// return book
const returnBook = async (req, res) => {
  try {
    const borrow = await Borrow.findById(req.params.id);
    if (!borrow) {
      res.status(404).json({ message: "Borrow not found" });
    }
    if (borrow.status !== "borrowed") {
      res.status(400).json({ message: "Book already returned" });
    }
    if (borrow.user !== req.user.id) {
      res.status(403).json({ message: "this is not your borrow record" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
