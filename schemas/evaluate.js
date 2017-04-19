import mongoose from 'mongoose'
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

let EvaluateSchema = new mongoose.Schema({
	from:{type:ObjectId,ref:'User'},
	to:{type:ObjectId,ref:'User'},
	job:{type:ObjectId,ref:'Job'},
	content:String,
	star:Boolean,
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

module.exports = EvaluateSchema