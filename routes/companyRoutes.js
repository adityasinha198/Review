const express = require('express')
const router = express.Router()
const companyController = require('../controllers/companyController')
const validation = require('../validation/company/companyValidation')
const authentication = require('../middlewares/authMiddleware')

router.post('/addCompany',authentication, validation.companyValidation, companyController.addCompany)
router.get('/companyList', authentication, companyController.companyList)
router.get('/search', authentication, companyController.searchCompany)
router.get('/details/:id', authentication, companyController.companyDetails)

module.exports = router