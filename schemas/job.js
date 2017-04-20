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

JobSchema.statics = {
	fetch:function(cb){
		return this
		.find({})
		.sort('meta.updateAt')
		.exec(cb);
	},
	findByName:function(name,cb){
		return this
		.findOne({name:name})
		.exec(cb);
	}
};

module.exports = JobSchema