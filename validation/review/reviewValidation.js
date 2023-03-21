const reviewSchema = require('./reviewValidationSchema')

exports.reviewValidation = async (req, res, next) => {
    const value = await reviewSchema.addReview.validate(req.body, { abortEarly: false })
    if (value.error) {
        res.json({
            success: "failure",
            error: value.error.details[0].message
        })
    }
    else {
        next()
    }
}
