const Borrow = require("../models/borrowModel");
const Book = require("../models/bookModel");

//borrow a book
const borrowBook = async (req, res) => {
  try {
    const book = await Book.findById(req.body.bookId);
    if (!book) {
      res.status(404).json({ message: "book not found" });
    }
    if (book.availableCopies <= 0) {
      res.status(400).json({ message: "No copies available" });
    }
    const newBorrow = await create({
      userId: req.body.userId,
      bookId: req.body.bookId,
    });
    if (!newBorrow) {
      res.status(500).json({ message: "Operation hasn't done" });
    }
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
    const updateBorrow = await Borrow.findByIdAndUpdate(
      borrow._id,
      {
        status: "returned",
        returnedAt: Date.now,
      },
      { new: true },
    );
    if (!updateBorrow) {
      res.status(404).json({ message: "borrow not found" });
    }
    const updateBook = await Book.findByIdAndUpdate(
      borrow.book,
      {
        $inc: { avaibleCopies: 1 },
      },
      { new: true },
    );
    if (!updateBook) {
      res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(updateBorrow);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get all borrows
const getAllBorrows = async (req, res) => {
  try {
    const borrows = await Borrow.find();
    res.status(200).json(borrows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get my borrows
const getMyBorrows = async (req, res) => {
  try {
    const myBorrows = await Borrow.findById(req.user.id);
    if (!myBorrows) {
      res.status(404).json({ message: "borrows not found" });
    }
    res.status(200).json(myBorrows);
  } catch (error) {
    res.status(500).json({ message: error.messsage });
  }
};

module.exports = { borrowBook, returnBook, getAllBorrows, getMyBorrows };
