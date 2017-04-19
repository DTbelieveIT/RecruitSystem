import mongoose from 'mongoose'

let JobSchema = new mongoose.Schema({
	name:{
		unique:true,
		type:String
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

module.exports = JobSchema