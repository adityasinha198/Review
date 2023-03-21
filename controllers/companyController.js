const companySchema = require('../models/companyModelSchema')
const reviewSchema = require('../models/reviewModelSchema')

const addCompany = async (req, res) => {
    const isCompanyExist = await companySchema.findOne({ cname: req.body.cname })
    if (isCompanyExist) {
        res.status(409).json({
            success: "success",
            error: "Company name already exists"
        })
    } else {
        try {
            const saveCompany = await new companySchema(req.body)
            const info = await saveCompany.save()
            if (info) {
                res.status(201).json({
                    success: "success",
                    message: "Company added"
                })
            }
        } catch (err) {
            res.status(400).json({
                success: "success",
                error: err.message
            })
        }
    }
}

const companyList = async (req, res) => {
    try {
        const listCompany = await companySchema.find()
        if (listCompany) {
            res.status(200).json({
                success: "success",
                companyData: listCompany
            })
        }
    } catch (err) {
        res.status(400).json({
            success: "failure",
            error: err.message
        })
    }
}

const searchCompany = async (req, res) => {
    try {
        const searchCompany = await companySchema.find({ city: req.body.city })
        if (searchCompany) {
            res.status(200).json({
                success: "success",
                searchData: searchCompany
            })
        }
    } catch (err) {
        res.status(400).json({
            success: "failure",
            message: err.message
        })
    }
}

const companyDetails = async (req, res) => {
    try {
        const company = await reviewSchema.find({ companyId: req.params.id })
            .populate({
                path: "userId",
                select: { "username": 1 }
            }).populate({
                path: "companyId",
                select: { "cname": 1, "location": 1, "city": 1 }
            })
        if (company) {
            res.status(200).json({
                success: "success",
                copmanyData: company
            })
        }
        else {
            res.status(400).json({
                success: "failure",
                error: err.message
            })
        }
    } catch (err) {
        res.status(400).json({
            success: "failure",
            error: err.message
        })
    }
}

module.exports = {
    addCompany,
    companyList,
    searchCompany,
    companyDetails
}
