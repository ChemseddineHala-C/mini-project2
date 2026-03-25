const Book = require("../models/bookModel");

//get all books
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    return res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get one book by id
const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.param.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get books depending on their genre
const getBooksByGenre = async (req, res) => {
  try {
    const books = await Book.find({ genre: req.query.genre });
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get books depending on their author
const getBooksByAuthor = async (req, res) => {
  try {
    const books = await Book.find({ author: req.query.author });
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//post a book
const postBook = async (req, res) => {
  try {
    const { title, author, genre, totalCopies, avaibleCopies } = req.body;

    if (!title || !author || !genre || !totalCopies || !avaibleCopies) {
      res.status(400).jaon({ message: "all fields are required" });
    }
    const newBook = await Book.create({
      title,
      author,
      genre,
      totalCopies,
      avaibleCopies,
    });
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ Message: error.message });
  }
};

//update a book by id
const updateBookInfo = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!book) {
      res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete a book by id
const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  getBooksByGenre,
  getBooksByAuthor,
  postBook,
  updateBookInfo,
  deleteBook,
};
