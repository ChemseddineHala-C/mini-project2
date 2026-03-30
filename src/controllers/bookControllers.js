const Book = require("../models/bookModel");
const AppError = require("../utils/AppError");
const asyncHandler = require("../utils/asyncHandler");

//get all books
const getAllBooks = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.genre) filter.genre = req.query.genre;
  if (req.query.author) filter.author = req.query.author;
  const books = await Book.find(filter);
  return res.status(200).json(books);
});

//get one book by id
const getBookById = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) throw new AppError("book not found", 404);
  res.status(200).json(book);
});

//post a book
const postBook = asyncHandler(async (req, res) => {
  const { title, author, genre, totalCopies, availableCopies } = req.body;

  if (!title || !author || !genre || !totalCopies || !availableCopies)
    throw new AppError("all fields are required", 400);
  const newBook = await Book.create({
    title,
    author,
    genre,
    totalCopies,
    availableCopies,
  });
  res.status(201).json(newBook);
});

//update a book by id
const updateBookInfo = asyncHandler(async (req, res) => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!book) throw new AppError("book not found", 404);
  res.status(200).json(book);
});

//delete a book by id
const deleteBook = asyncHandler(async (req, res) => {
  const book = await Book.findByIdAndDelete(req.params.id);
  if (!book) throw new AppError("book not found", 404);
  res.status(200).json({ message: "Book deleted successfully" });
});

module.exports = {
  getAllBooks,
  getBookById,
  postBook,
  updateBookInfo,
  deleteBook,
};
