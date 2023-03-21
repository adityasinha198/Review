const express = require('express')
const router = express.Router()
const reviewController = require('../controllers/reviewController')
const authentication = require('../middlewares/authMiddleware')
const validation = require('../validation/review/reviewValidation')

router.get('/reviewList/:id', authentication, reviewController.getReview)
router.post('/addReview', authentication, validation.reviewValidation, reviewController.addReview)
router.patch('/update/:id', authentication, reviewController.updateReview)
router.delete('/delete/:id', authentication,reviewController.deletereview)
router.get('/detail/:id',authentication,reviewController.detailReview)

module.exports = router