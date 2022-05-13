const { Schema } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBooks` array in User.js
const bookSchema = new Schema({
  authors: [String],
  description: String,
  // saved book id from GoogleBooks
  bookId: { type: String, required: true },
  image: String,
  link: String,
  title: { type: String, required: true }
});

module.exports = bookSchema;
