const mongoose = require('mongoose')
const Schema = mongoose.Schema

let User = new Schema({
    name: {
        type: String
    },
    surname: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    }
})

module.exports = mongoose.model('User', User)