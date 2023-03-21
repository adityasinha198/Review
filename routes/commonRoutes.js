const express = require('express')
const router = express.Router()
const userRoute = require('./userRoutes')
const companyRoute = require('./companyRoutes')
const reviewRoute = require('./reviewRoutes')

router.use('/user', userRoute)
router.use('/company', companyRoute)
router.use('/review', reviewRoute)

module.exports = router