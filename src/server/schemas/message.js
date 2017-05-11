import mongoose from 'mongoose'
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

let MessageSchema = new mongoose.Schema({
    from: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    to: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    content: {
        type: String,
        default: '',
    },
    msgType:{
        type:String,
        enum:['chat','resume'],
    },
    readed:{
        type:Boolean,
        default:false
    },
	meta:{
		createAt:{
			type:Date,
			default:Date.now()
		},
		updateAt:{
			type:Date,
			default:Date.now()
		}
	}
})

MessageSchema.statics = {
    fetch:function(){
        return new Promise((resolve,reject) => {
            this
            .find({},'from to content')
            .populate('from','account')
            .populate('to','account')
            .exec((err,info) => {
                resolve(info)
            })
        })
    },
    fetchById:function(id){
        return new Promise((resolve,reject) => {
            this
            .findOne({_id:id})
            .populate('from','account')
            .populate('to','account')
            .exec((err,info) => {
                resolve(info)
            })
        })
    },
};

module.exports = MessageSchema