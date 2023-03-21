const userSchema = require('./userValidationSchema')

exports.userValidation = async (req, res, next) => {
    console.log(req.body)
    const value = await userSchema.registerUser.validate(req.body, { abortEarly: false })
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


exports.loginValidation = async (req, res, next) => {
    const value = await userSchema.loginUser.validate(req.body, { abortEarly: false })
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




