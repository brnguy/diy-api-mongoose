const express = require('express')
const db = require('../models')
const router = express.Router()

router.put('/:id', async (req, res) => {
    try {
        const book = await db.Book.findOne({
            "notes._id": req.params.id
        })
        const note = await book.notes.id(req.params.id)

        note.content = req.body.content

        await book.save()

        res.json(book)
    } catch (err) {
        console.log(err)
        res.status(503).json({ msg: 'Error' })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const book = await db.Book.findOne({
            "notes._id": req.params.id
        })
        book.notes.id(req.params.id).remove()

        await book.save()

        res.json(book)
    } catch (err) {
        console.log(err)
        res.status(503).json({ msg: 'Error' })
    }
})

module.exports = router