const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CardSchema = require('./Card')

const PlayerSchema = new Schema({    
    name: {
        type: String,
        min: 3,
        max: 20,
        required: true
    },
    score: {
        type: Number,
        default: 0
    },
    cards: [
        CardSchema
    ]
})

module.exports = PlayerSchema
