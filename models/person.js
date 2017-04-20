import mongoose from 'mongoose'
import PersonSchema from '../schemas/person'
let Person = mongoose.model('Person',PersonSchema)

module.exports = Person