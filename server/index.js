// Defines required modules
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const path = require('path')

// Get express and the router
const app = express()
const router = express.Router()

// Get the mongoose instance
const mongoose = require('mongoose')

// Connects to MongoDB through public database URI or local database
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:4000/dixit'
mongoose.connect(mongoUri)

// Check for DB errors
const db = mongoose.connection
db.on('error', function(err) {
    console.log(err)
})

// Set host and port to environment variables or default values
const host = process.env.HOST || 'localhost'
const port = process.env.PORT || '8080'

// Parse json responses and allow requests from any domain
app.use(bodyParser.json())
app.use(cors())

// Log server messages
app.use(morgan('dev'))

router.use('/games', require('./routes/games'))
router.use('/images', require('./routes/images'))

app.use('/api', router)

// Listen the server
app.listen(port, host)
app.on('listening', function() {
    console.log('Express server started on port %s at %s', server.address().port, server.address().address)
})

// Exit properly on CTRL-C
process.on('SIGINT', () => {
    process.exit()
})
