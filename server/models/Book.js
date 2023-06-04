
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const booksSchema = Schema({
  idBook: {
    type: Number,
    unique: true,
    required: true,
  },

  bookName: {
    type: String,
    required: true,

  },

  category: {
    //type: mongoose.Types.ObjectId, 
    //ref: "Category"
    type: String,
    required: true,
  },

  author: {
    type: String,
    required: true,
  },

  picBook: {
    type: String,
    data: Buffer,
    required: true,
  },

  publishing: {
    type: String,
    required: true,
  },

  publishingYear: {
    type: Number,
    required: true,
  },
  numPages: {
    type: Number,
    required: true,
  },

  summary: {
    type: String,
    required: true,
  },

  copies: {
    type: Number,
    required: true,
  },

  copyAvailable: {
    type: Number,
    required: true,
  },

  language: {
    type: String,
    required: true,
  },

  location: {
    type: String,
    required: true,
  },

  seriesName: {
    type: String
  },
  createdAt: {
    type: Date,
    required: true,
  }

});


module.exports = Book = mongoose.model("books", booksSchema);