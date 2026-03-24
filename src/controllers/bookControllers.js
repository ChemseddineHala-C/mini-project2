const Book = require("../models/bookModel");

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    return res.status(200).json({ books });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBookById = async (req, res) => {
  try {
    const book = await Book.findById({ req.param.id });
    if (!book) {
      return res.status(401).json({ message: "User not found" });
    }
    res.status(200).json({ book });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const getBooksByGenre = async (req, res) => {
  try {
    const books = await Book.findOne({ req.query.genre });
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
