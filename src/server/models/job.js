import mongoose from 'mongoose'
import JobSchema from '../schemas/job'
let Job = mongoose.model('Job',JobSchema)

module.exports = Job