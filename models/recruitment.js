import mongoose from 'mongoose'
import RecruitmentSchema from '../schemas/recruitment'
let Recruitment = mongoose.model('Recruitment',RecruitmentSchema)

module.exports = Recruitment