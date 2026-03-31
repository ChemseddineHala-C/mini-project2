const Borrow = require("../models/borrowModel");
const Book = require("../models/bookModel");
const AppError = require("../utils/AppError");
const asyncHandler = require("../utils/asyncHandler");

//borrow a book
const borrowBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.body.bookId);
  if (!book) throw new AppError("book not found", 404);
  if (book.availableCopies <= 0) throw new AppError("no copies available", 400);

  const newBorrow = await Borrow.create({
    userId: req.user.id,
    bookId: req.body.bookId,
  });
  if (!newBorrow) throw new AppError("Operation hasn't done", 500);
  const decrease = await Book.findByIdAndUpdate(
    req.body.bookId,
    { $inc: { availableCopies: -1 } },
    { new: true },
  )
    .populate("userId", "name email")
    .populate("bookId", "titel author");

  if (!decrease) throw new AppError("Operation hasn't done", 500);
  res.status(200).json(newBorrow);
});

// return book
const returnBook = asyncHandler(async (req, res) => {
  const borrow = await Borrow.findById(req.params.id);
  if (!borrow) throw new AppError("borrow not found", 404);
  if (borrow.status !== "borrowed")
    throw new AppError("Book already returned", 400);
  if (borrow.userId.toString() !== req.user.id)
    throw new AppError("this is not your borrow record", 403);
  const updateBorrow = await Borrow.findByIdAndUpdate(
    borrow._id,
    {
      status: "returned",
      returnedAt: Date.now(),
    },
    { new: true },
  )
    .populate("userId", "name email")
    .populate("bookId", "titel author");

  if (!updateBorrow) throw new AppError("borrow not found", 404);
  const updateBook = await Book.findByIdAndUpdate(
    borrow.bookId,
    {
      $inc: { availableCopies: 1 },
    },
    { new: true },
  );
  if (!updateBook) throw new AppError("book not found", 404);
  res.status(200).json(updateBorrow);
});

//get all borrows
const getAllBorrows = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const total = await Book.countDocuments();

  const borrows = await Borrow.find()
    .populate("userId", "name email role")
    .populate("bookId", "title author genre")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  res
    .status(200)
    .json({ total, page, pages: Math.ceil(total / limit), limit, borrows });
});

//get my borrows
const getMyBorrows = asyncHandler(async (req, res) => {
  const myBorrows = await Borrow.find({ userId: req.user.id })
    .populate("UserId", "name email role")
    .populate("bookId", "title author genre availableCopies");
  if (!myBorrows) throw new AppError("borrow not found", 404);
  res.status(200).json(myBorrows);
});

module.exports = { borrowBook, returnBook, getAllBorrows, getMyBorrows };
