const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const passport = require('passport')
require('./config/passport')
const connection = require('./config/database')
const app = express()

if(process.env.NODE_ENV != 'production'){
    require('dotenv').config()
    app.use(morgan('dev'))
}

// Connect to database
connection

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

// Routes
app.use('/', passport.authenticate('jwt', {session: false}), require('./routes/issue_route'))

const PORT = process.env.PORT || 8003

app.listen(PORT, () => {
    console.log(`Issue Report Service listening on ${PORT}`)
})
