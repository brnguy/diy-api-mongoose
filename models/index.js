const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1/diyApiBookList')

const db = mongoose.connection

db.once('open', () => {
    console.log(`MongoDB running on ${db.host}:${db.port}`)
})

db.on('error', err => {
    console.log(`Error. Something has gone wrong! ${err}`)
})

module.exports.Book = require('./book')