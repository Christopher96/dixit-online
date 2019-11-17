const mongoose = require('mongoose')
const Card = require('../schemas/Card')

module.exports = mongoose.model('card', Card)
