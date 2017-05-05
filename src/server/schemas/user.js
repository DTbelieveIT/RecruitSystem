import mongoose from 'mongoose'
import bcrypt from 'bcrypt-nodejs'

let UserSchema = new mongoose.Schema({
	account:{
		unique:true,
		type:String
	},
	password:String,
	role:Number,//0：个人用户，1：企业用户，2：管理员
	imgPath:{
		type:String,
		default:'/default.png'
	},
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
	var user = this
	if(this.isNew){
		this.meta.createAt = this.meta.updateAt = Date.now()
	}else{
		this.meta.updateAt = Date.now()
	}
	bcrypt.hash(user.password,null,null,function(err,hash){
		if(err){
			return next(err)
		}
		user.password = hash
		next()
	})
})

UserSchema.methods = {
	comparePassword:function(_password){
		return bcrypt.compareSync(_password,this.password)
	}
}

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