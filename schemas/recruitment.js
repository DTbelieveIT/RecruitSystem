import mongoose from 'mongoose'
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

let RecruitmentSchema = new mongoose.Schema({
	job:{type:ObjectId,ref:'Job'},
	company:{type:ObjectId,ref:'Company'},
	person:[
		{type:ObjectId,ref:'Person'}
	],
	recruitNum:Number,
	salary:Number,
	educationRequire:Number,//0：不限，1：专科，2：本科或本科以上
	detail:String,
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

RecruitmentSchema.statics = {
	fetch:function(){
		return new Promise((resolve,reject) => {
			this
			.find({})
			.populate({
				path:'company',
				populate:{
					path:'company'
				}
			})
			.populate('job')
			.populate('person')
			.exec((err,info) => {
				resolve(info)
			})
		})
	},
	fetchById:function(id){
		return new Promise((resolve,reject) => {
			this
			.findOne({_id:id})
			.populate({
				path:'company',
				populate:{
					path:'company'
				}
			})
			.populate('job')
			.populate('person')
			.exec((err,info) => {
				resolve(info)
			})
		})
	},
	findByName:function(name,cb){
		return this
		.findOne({name:name})
		.exec(cb);
	}
};

module.exports = RecruitmentSchema