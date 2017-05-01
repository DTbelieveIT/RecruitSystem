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
			.populate('company')
			.populate('job')
			.populate('person')
			.exec((err,info) => {
				resolve(info)
			})
		})
	},
	// fetch:function(cb){
	// 	return this
	// 	.find({})
	// 	.sort('meta.updateAt')
	// 	.exec(cb);
	// },
	findByName:function(name,cb){
		return this
		.findOne({name:name})
		.exec(cb);
	}
};

module.exports = RecruitmentSchema