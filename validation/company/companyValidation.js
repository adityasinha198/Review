const companySchema = require('./companyValidationSchema')

exports.companyValidation = async (req, res, next) => {
    console.log(req)
    const value = await companySchema.registerCompany.validate(req.body, { abortEarly: false })
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
