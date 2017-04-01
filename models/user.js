import mongoose from 'mongoose'
import UserSchema from '../schemas/user'
let User = mongoose.model('User',UserSchema)

module.exports = User