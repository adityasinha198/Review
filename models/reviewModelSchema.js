const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { ObjectId } = Schema.Types

const reviewSchema = new mongoose.Schema({

    subject: {
        type: String,
        required: true
    },
    review: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    companyId: {
        type: ObjectId,
        ref: 'company'
    },
    userId: {
        type: ObjectId,
        ref: 'user'
    },
    isActive: {
        type: Boolean,
        default: true
    }

}, { timestamps: true })

module.exports = mongoose.model('review', reviewSchema)
