const jwt = require('jsonwebtoken')
const userSchema = require('../models/userModelSchema')

const checkUserAuth = async (req, res, next) => {
    let token;
    const { authorization } = req.headers
    if (authorization && authorization.startsWith("Bearer")) {
        try {
            token = authorization.split(' ')[1]
            if (token) {
                const { userId } = jwt.verify(token, process.env.JWT_SECRET_KEY)
                req.user = await userSchema.findById(userId).select('-password')
                next()
            }
            else {
                res.status(401).json({
                    success: "Unsuccessfull",
                    message: "Unauthorised access"
                })
            }

        }
        catch (err) {
            console.log(err)
        }
    }
}

module.exports = checkUserAuth
