const mongoose = require('mongoose')

const authSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required:true,
    },
    lastName: String,
    email: {
        type: String,
        required:true,
        unique:true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: [6,"password should be greater than 5 character."]
    }
})

module.exports = mongoose.model('auth', authSchema)