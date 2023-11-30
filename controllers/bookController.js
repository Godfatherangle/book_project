const Book = require('../models/Book');

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.render('index', { books });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

exports.getBookById = async (req, res) => {
  const bookId = req.params.id;
  try {
    const book = await Book.findById(bookId);
    res.render('bookDetails', { book });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

exports.getAddBookForm = (req, res) => {
  res.render('add');
};

exports.addBook = async (req, res) => {
  const { title, author, description, price } = req.body;
  try {
    await Book.create({ title, author, description, price });
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

exports.getEditBookForm = async (req, res) => {
  const bookId = req.params.id;
  try {
    const book = await Book.findById(bookId);
    res.render('edit', { book });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

exports.updateBook = async (req, res) => {
  const bookId = req.params.id;
  const { title, author, description, price } = req.body;
  try {
    await Book.findByIdAndUpdate(bookId, { title, author, description, price });
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

exports.deleteBook = async (req, res) => {
  const bookId = req.params.id;
  try {
    await Book.findByIdAndDelete(bookId);
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};
