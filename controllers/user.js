import User from '../models/user'
import Adminstrator from '../models/adminstrator'
import {RSADecrypt} from '../tools/RSADecrypt'
let roles = ['person','company','adminstrator']

exports.signup = (req,res) => {
	let userObject = req.body
	User.findOne({
		account:userObject.account
	},function(err,user){
		if(err){
			console.log(err)
		}
		if(user){
			return res.send({result:'account existed!'})
		}else{
			userObject.password = RSADecrypt(userObject.password)
			let _user = new User(userObject)
			_user.save(function(err,user){
				if(err){
					console.log(err)
				}
				let userRole=null, userObj = null
				switch(roles[user.role]){
					case 'person':
						console.log('person')					
						break
					case 'company':
						console.log('company')					
						break
					case 'adminstrator':
						console.log('adminstrator')
						userObj = new Adminstrator({
							adminstrator:user._id,
							name:userObject.name,
							phone:userObject.phone
						})
						userRole = 'adminstrator'
						break
					default:
						throw new Error('illegal role')	
				}

				userObj.save(function(err,user){					
					if(err){
						console.log(err)	
					} 
					console.log('logon success')
					return res.send({code:200})
				})
			})
		}
	})
}

exports.signin = (req,res) => {
	let _user = req.body
	let {account,password} = _user
	User.findOne({
		account:account
	},function(err,user){
		if(err){
			console.log(err)
		}
		if(!user){
			return res.send({result:'user not exist'})
		}

		let decrypted = RSADecrypt(password)
		
		if(decrypted === user.password){
			console.log('password is match')
			return res.send({code:200})
		}else{
			console.log('password is not match')
			return res.send({result:'login fail'})
		}
	})
}