const express = require('express')
const router = express.Router()
const db = require('../models')

// GET /book -- READ all books
router.get('/', (req, res) => {
    db.Book.find({})
        .then(books => {
            res.json(books)    
        })
        .catch(console.log)
})

// POST /book -- CREATE new book
router.post('/', (req, res) => {
    // create blog with req.body
    db.Book.create(req.body)
        .then(newBook => {
            // send the newly created blog back/redirect
            res.json(newBook)
        })
    // handle errors
        .catch(console.log)
})

// GET /book/:id -- READ a single blog @ :id
router.get('/:id', (req, res) => {
    db.Book.findById(req.params.id)
        .then(foundBook => {
        if (!foundBook) return res.status(404).json({ msg: 'Book Not Found'})
        res.json(foundBook)
        })
        .catch(err => {
        res.status(503).json({ msg: 'Server Burned Down' })
        })
})

// PUT /book/:id -- UPDATE a single blog @ :id
router.put('/:id', (req, res) => {
    db.Book.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(updatedBook => {
            res.json(updatedBook)
        })
        .catch(err => {
            console.log(err)
            res.status(503).json({ msg: 'Whoops' })
        })
})

// DELETE /book/:id -- DESTROY a book
router.delete('/:id', (req, res) => {
    db.Book.findByIdAndDelete(req.params.id)
        .then(() => res.status(204))
        .catch(err => {
            console.log(err)
        })
})

router.post('/:id/note', async (req, res) => {
    try {
        // find the book at :id
        const book = await db.Book.findById(req.params.id)
        // push it to the blog's comment array
        book.notes.push(req.body)
        // save the blog
        await book.save()
        // send the blog back in the response
        res.json(book)
    } catch (err) {
        console.log(err)
        res.status(503).json({ msg: 'Error' })
    }
})

module.exports = router