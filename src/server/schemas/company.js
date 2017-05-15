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

CompanySchema.statics = {
	fetch:function(){
		return new Promise((resolve,reject) => {
			this
			.find({})
			.sort('meta.updateAt')
			.populate('company','-password')
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
	queryAllByAcountId: function (accountId) {
		return new Promise((resolve, reject ) => {
			this
			.findOne({company:accountId})
			.populate('company')
			.exec((err, info) => {
				resolve(info);
			})
		})
	}
}

module.exports = CompanySchema