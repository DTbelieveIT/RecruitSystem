import mongoose from 'mongoose'
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

let AuthSchema = new mongoose.Schema({
    user: {
        type: ObjectId,
        ref: 'User',
    },
    clients:[{
        type:String,
      } 
    ],
    meta: {
        createAt: {
          type: Date,
          default: Date.now()
        },
        updateAt: {
          type: Date,
          default: Date.now()
        }
    }    
});

module.exports = AuthSchema
