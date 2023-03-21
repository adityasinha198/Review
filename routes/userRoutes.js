const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const validation = require('../validation/user/userValidation')
const upload = require('../middlewares/saveImage')

router.post('/signup',  validation.userValidation, userController.saveuser)
router.post('/userSignIn', validation.loginValidation, userController.userLogin)
router.post('/resetPassword', userController.resetUserPassword)
router.post('/updatePassword/:id/:token', userController.savePassword)


module.exports = router
