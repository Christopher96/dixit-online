const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PlayerSchema = new Schema({    
    name: {
        type: String
    },
    score: {
        type: Number,
        default: 0
    }
})

module.exports = PlayerSchema
