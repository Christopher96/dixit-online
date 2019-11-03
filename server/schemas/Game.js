const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PlayerSchema = require('./Player')

const GameSchema = new Schema({
    gameid: {
        type: String,
        min: 3,
        max: 20,
        unique: true,
        required: true
    },
    currentPlayer: {
        type: Number,
        default: 0
    },
    players: [
        PlayerSchema
    ]
})

module.exports = GameSchema
