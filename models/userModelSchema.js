const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true
    },
    useremail: {
        type: String,
        required: true
    },
    userphoneno: {
        type: String,
        required: true

    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "user"
    },
    profilePic: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: true

    }

}, { timestamps: true })

module.exports = mongoose.model('user', userSchema)