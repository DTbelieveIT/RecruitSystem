import mongoose from 'mongoose'
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

let AdminstratorSchema = new mongoose.Schema({
	adminstrator:{type:ObjectId,ref:'User'},
	name:String,
	phone:String,
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

AdminstratorSchema.statics = {
	fetch:function(){
		return new Promise((resolve,reject) => {
			this
			.find({})
			.sort('meta.updateAt')
			.populate('adminstrator','-password')
			.exec((err,info) => {
				resolve(info)
			})
		})
	},
	findById:function(id,cb){
		return this
		.findOne({
			_id:id
		})
		.exec(cb)
	},
	findByName:function(account,cb){
		return this
		.findOne({
			account:account
		})
		.exec(cb)
	},
	queryAllByAcountId: function (accountId) {
		return new Promise((resolve, reject ) => {
			this
			.findOne({adminstrator:accountId})
			.populate('adminstrator')
			.exec((err, info) => {
				resolve(info);
			})
		})
	}
}

module.exports = AdminstratorSchema