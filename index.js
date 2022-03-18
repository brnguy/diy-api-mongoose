const express = require('express')
require('./models')
const cors = require('cors')

// MIDDLEWARE
const app = express()
const PORT = 8080

// PARSE JSON REQUEST BODIES
app.use(express.json())

// if process.env.NODE_ENV != 'production'
app.use(cors())

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the home page ' })
})

// CONTROLLERS
app.use('/book', require('./controllers/book'))
app.use('/note', require('./controllers/notes'))

app.listen(PORT, () => {
    console.log(`Connected to Port ${PORT}`)
})