import mongoose from 'mongoose'
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

let PresonSchema = new mongoose.Schema({
	person:{type:ObjectId,ref:'User'},
	resume:{
		path:{
			type:String,
			default:''
		},
		name:String,
		sex:String,
		birthday:Date,
		age:Number,
		phone:String,
		email:String,
		education:Number,//0：不限，1：专科，2：本科或本科以上
		isGraduate:{tyoe:Boolean,default:false},
		job:{type:ObjectId,ref:'Job'}
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

module.exports = PresonSchema