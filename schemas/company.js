import mongoose from 'mongoose'
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

let CompanySchema = new mongoose.Schema({
	company:{type:ObjectId,ref:'User'},
	name:String,
	address:String,
	size:String,
	foundAt:Date,
	authenticated:{
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

module.exports = CompanySchema