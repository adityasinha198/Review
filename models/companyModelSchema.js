const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { ObjectId } = Schema

const companySchema = new mongoose.Schema({

    cname: {
        type: String,
        required: true
    },
    location: {

        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    founded: {
        type: Date,
        required: true
    },
    userId: {
        type: ObjectId,
        ref: 'user',
        required: true
    },

    isActive: {
        type: Boolean,
        default: true
    },



}, { timestamps: true })

module.exports = mongoose.model('company', companySchema)