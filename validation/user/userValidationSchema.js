const joi = require('joi')
const { joiPasswordExtendCore } = require('joi-password');
const joiPassword = joi.extend(joiPasswordExtendCore)

const userSchema = {
    registerUser: joi.object({
        username: joi.string().min(1).required(),
        useremail: joi.string().min(1).required(),
        userphoneno: joiPassword
            .string()
            .min(1)
            .noWhiteSpaces()
            .required()
            .messages({
                'userphoneno.noWhiteSpaces': '{#label} should not contain white spaces'
            }),
        city: joi.string().min(1).required(),
        state: joi.string().min(1).required(),
        password: joiPassword
            .string()
            .minOfSpecialCharacters(1)
            .minOfLowercase(1)
            .minOfUppercase(1)
            .minOfNumeric(1)
            .noWhiteSpaces()
            .messages({
                'password.minOfUppercase': '{#label} should contain at least {#min} uppercase character',
                'password.minOfSpecialCharacters': '{#label} should contain at least {#min} special character',
                'password.minOfLowercase': '{#label} should contain at least {#min} lowercase character',
                'password.minOfNumeric': '{#label} should contain at least {#min} numeric character',
                'password.noWhiteSpaces': '{#label} should not contain white spaces',
            })

    }).unknown(true),

    loginUser: joi.object({
        useremail: joi.string().min(1).required(),
        password: joi.string().min(1).required()

    }).unknown(true)
}

module.exports = userSchema