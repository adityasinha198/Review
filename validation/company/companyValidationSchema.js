const joi = require('joi')
const Joi = require('joi').extend(require('@joi/date'))

const companySchema = {
  registerCompany: joi.object({
    cname: joi.string().min(1).required(),
    location: joi.string().min(1).required(),
    city: joi.string().min(1).required(),
    founded: Joi.date().format('YYYY/MM/DD').required(),
    userId: joi.string().min(1).required(),
    

  

  }).unknown(true)
}


module.exports = companySchema