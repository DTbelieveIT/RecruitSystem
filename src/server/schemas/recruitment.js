import mongoose from 'mongoose'
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

let RecruitmentSchema = new mongoose.Schema({
	job:{type:ObjectId,ref:'Job'},
	company:{type:ObjectId,ref:'Company'},
	person:[{
		user:{type:ObjectId,ref:'User'},
		status:{type:Number,enum:[0,1,2,3,4],default:0},//status状态说明：0 待处理，1 拒绝，2 邀请面试，3 面试失败，4 面试成功
		evaluate:{type:String,default:''}
	}],
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
			.populate('person.user')
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
			.populate('person.user')
			.exec((err,info) => {
				resolve(info)
			})
		})
	},
	findByName:function(name,cb){
		return this
		.findOne({name:name})
		.exec(cb);
	},
};

module.exports = RecruitmentSchema