const mongoose = require('mongoose')
const Player = require('../schemas/Player')

module.exports = mongoose.model('Player', Player)
