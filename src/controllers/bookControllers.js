const Book = require("../models/bookModel");

//get all books
const getAllBooks = async (req, res) => {
  try {
    const filter = {};
    if (req.query.genre) filter.genre = req.query.genre;
    if (req.query.author) filter.author = req.query.author;
    const books = await Book.find(filter);
    return res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get one book by id
const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get books depending on their genre or their genre
const getBooksByFilter = async (req, res) => {
  try {
    const filter = {};
    if (req.query.genre) {
      filter.genre = req.query.genre;
    }
    if (req.query.author) {
      filter.author = req.query.author;
    }
    const books = await Book.find(filter);
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//post a book
const postBook = async (req, res) => {
  try {
    const { title, author, genre, totalCopies, availableCopies } = req.body;

    if (!title || !author || !genre || !totalCopies || !availableCopies) {
      return res.status(400).json({ message: "all fields are required" });
    }
    const newBook = await Book.create({
      title: title,
      author: author,
      genre: genre,
      totalCopies: totalCopies,
      availableCopies: availableCopies,
    });
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update a book by id
const updateBookInfo = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
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
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  getBooksByFilter,
  postBook,
  updateBookInfo,
  deleteBook,
};
