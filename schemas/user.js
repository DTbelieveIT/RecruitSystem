import mongoose from 'mongoose'

let UserSchema = new mongoose.Schema({
	account:{
		unique:true,
		type:String
	},
	password:String,
	role:Number,//0：个人用户，1：企业用户，2：管理员
	meta: {
	    createAt: {
	      type: Date,
	      default: Date.now()
	    },
	    updateAt: {
	      type: Date,
	      default: Date.now()
	    }
	}
})

UserSchema.pre('save',function(next){
	// var user = this
	// console.log('-------------------------')
	// console.log(user)
	// console.log('-------------------------')
	// user.password = 'preson'
	next()
})

UserSchema.statics = {
	fetch:function(cb){
		return this
		.find({})
		.sort('meta.updateAt')
		.exec(cb)
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
	}
}

module.exports = UserSchema