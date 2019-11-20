const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CardSchema = new Schema({    
    color: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    full: {
        type: String,
        required: true
    },
    description: {
        type: String
    }
})

module.exports = CardSchema
