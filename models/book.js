const mongoose = require('mongoose')

// make note Schema
const noteSchema = new mongoose.Schema({
    content: String
})

// make schema
const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    summary: String,
    notes: [noteSchema]
})

//make model and export
module.exports = mongoose.model('Book', bookSchema)