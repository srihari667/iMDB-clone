const express = require('express')
const app = express()
const validator = require('express-validator')
const dotenv = require('dotenv').config()
const { DB } = require('./config/db')
const colors = require('colors')
const { ErrorHandlers } = require('./middlewares/errorhandlers')
const cors = require('cors')

const PORT = process.env.PORT || 5000
app.use(cors({ origin: '*' }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

DB()
app.use('/Review', require('./routes/reviewRoutes'))
app.use('/session', require('./routes/sessionRoutes'))
app.use('/actor', require('./routes/actorRoutes'))
app.use('/', require('./routes/moviesRoutes'))

app.use(ErrorHandlers)
app.listen(PORT, () => {
  console.log(`${PORT.toString().green} is running `)
})
