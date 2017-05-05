import mongoose from 'mongoose'
import CompanySchema from '../schemas/company'
let Company = mongoose.model('Company',CompanySchema)

module.exports = Company