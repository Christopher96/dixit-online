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
    status: {
        type: String,
        default: "PICKING"
    },
    teller: {
        type: Number,
        default: 0
    },
    picker: {
        type: Number,
        default: 0
    },
    guesser: {
        type: Number,
        default: 0
    },
    keyword: {
        type: String,
        min: 3,
        max: 20
    },
    players: [
        PlayerSchema
    ]
})

module.exports = GameSchema
