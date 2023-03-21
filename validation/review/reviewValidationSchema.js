const joi = require('joi')
const Joi = require('joi').extend(require('@joi/date'))

const reviewSchema = {
  addReview: joi.object({
    subject: joi.string().min(1).required(),
    review: joi.string().min(1).required(),
    rating: joi.number().min(1).required(),
    companyId: joi.string().min(1).required(),
    userId: joi.string().min(1).required()
  }).unknown(true)
}

module.exports = reviewSchema