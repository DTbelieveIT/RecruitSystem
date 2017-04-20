import User from '../models/user'
import Adminstrator from '../models/adminstrator'
import Person from '../models/person'
import Company from '../models/company'
import Job from '../models/job'
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
						let resume = {}
						let jobObj = null
						resume = {
							name:userObject.name,
							phone:userObject.phone,
							email:userObject.email,
						}
						Job.findOne({name:userObject.job},function(err,job){
							if(err){
								console.log(err)
							}
							if(!job){
								jobObj = new Job({name:userObject.job})
								jobObj.save(function(err,job){
									if(err) console.log(err)
									resume.job = jobObj._id
									userObj = new Person({
										person:user._id,
										resume:resume
									})					
									userObj.save(function(err,user){					
										if(err){
											console.log(err)	
										} 
										console.log('logon success')
										return res.send({code:200})
									})
								})
							}else{
								resume.job = job._id
								userObj = new Person({
									person:user._id,
									resume:resume
								})					
								userObj.save(function(err,user){					
									if(err){
										console.log(err)	
									} 
									console.log('logon success')
									return res.send({code:200})
								})
							}

						})
						userRole = 'person'
						break
					case 'company':
						console.log('company')					
						userObj = new Company({
							company:user._id,
							name:userObject.name,
							address:userObject.address,
							size:userObject.size,
							foundAt:userObject.foundAt
						})							
						userRole = 'company'
						userObj.save(function(err,user){					
							if(err){
								console.log(err)	
							} 
							console.log('logon success')
							return res.send({code:200})
						})	
						break
					case 'adminstrator':
						console.log('adminstrator')
						userObj = new Adminstrator({
							adminstrator:user._id,
							name:userObject.name,
							phone:userObject.phone
						})
						userRole = 'adminstrator'
						userObj.save(function(err,user){					
							if(err){
								console.log(err)	
							} 
							console.log('logon success')
							return res.send({code:200})
						})
						break
					default:
						throw new Error('illegal role')	
				}
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