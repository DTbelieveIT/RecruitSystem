import mongoose from 'mongoose'
import AuthSchema from '../schemas/auth'
let Auth = mongoose.model('Auth',AuthSchema)

module.exports = Auth