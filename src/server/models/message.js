import mongoose from 'mongoose'
import MessageSchema from '../schemas/message'
let Message = mongoose.model('Message',MessageSchema)

module.exports = Message