const mongoose = require('mongoose')
const Game = require('../schemas/Game')

module.exports = mongoose.model('game', Game)
