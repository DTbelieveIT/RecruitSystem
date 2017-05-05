import mongoose from 'mongoose'
import AdminstratorSchema from '../schemas/adminstrator'
let Adminstrator = mongoose.model('Adminstrator',AdminstratorSchema)

module.exports = Adminstrator