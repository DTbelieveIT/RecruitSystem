import User from '../models/user'
import Adminstrator from '../models/adminstrator'
import Person from '../models/person'
import Company from '../models/company'
import Job from '../models/job'
import {RSADecrypt} from '../tools/RSADecrypt'
import _ from 'underscore'
let roles = ['person','company','adminstrator']

exports.signup = async (req,res) => {
	let userObject = req.body
	let user = await User.findOne({account:userObject.accout})
	if(user){
		return res.send({result:'account existed!'})
	}
	userObject.password = RSADecrypt(userObject.password)
	let _user = new User(userObject)
	await _user.save(function(err,user){
		if(err){
			console.log(err)
		}
		_user = user
	})
	let userObj
	switch(roles[_user.role]){
		case 'person':
			console.log('person')
			let resume = {
				name:userObject.name,
				phone:userObject.phone,
				email:userObject.email,
			}
			let job,jobObj
			job = await Job.findOne({name:userObject.job})
			if(!job){
				jobObj = new Job({name:userObject.job})
				job = await jobObj.save()
			}
			resume.job = job._id
			userObj = new Person({
				person:_user._id,
				resume:resume
			})
			await userObj.save(function(err,person){
				if(err){
					console.log(err)
				}
				console.log('logon success!')
				return res.send({code:200})
			})
			break
		case 'company':
			console.log('company')
			userObj = new Company({
				company:_user._id,
				name:userObject.name,
				address:userObject.address,
				size:userObject.size,
				foundAt:userObject.foundAt
			})
			await userObj.save(function(err,company){
				if(err){
					console.log(err)
				}
				console.log('logon success!')
				return res.send({code:200})
			})
			break
		case 'adminstrator':
			console.log('adminstrator')
			userObj = new Adminstrator({
				adminstrator:_user._id,
				name:userObject.name,
				phone:userObject.phone
			})
			await userObj.save(function(err,adminstrator){
				if(err){
					console.log(err)
				}
				console.log('logon success!')
				return res.send({code:200})
			})
			break
		default:
			throw new Error('illegal role!')
	}
}

exports.signin = async (req,res) => {
	let _user = req.body
	let {account,password} = _user
	let data
	let info
	await User.findOne({
		account:account
	},function(err,user){
		if(err){
			console.log(err)
		}
		_user = user
	})
	if(!_user){
		return res.send({result:'user not exist'})
	}
	let decrypted = RSADecrypt(password)	
	if(decrypted === _user.password){
		console.log('password is match')
		if(_user.role === 0){
			info = await Person.queryAllByAcountId(_user._id)
		}else if(_user.role === 1){
			info = await Company.queryAllByAcountId(_user._id)
		}else if(_user.role === 2){
			info = await Adminstrator.queryAllByAcountId(_user._id)
		}
		return res.send({code:200,info:info,user:_user})
	}else{
		console.log('password is not match')
		return res.send({result:'login fail'})
	}
}

exports.updateInfo = async (req,res) => {
	let info = req.body
	let account = info.account
	let user = await User.findByName(account)
	let newInfo
	if(info.password !== undefined){
		user.password = info.password
		user = await user.save()
	}
	if(user.role === 0){
		let _job = await Job.findOne({name:info.resume.job.name},function(err,job){
			if(err) console.log(err)
		})
		if(!_job){
			_job = new Job({name:info.resume.job.name})
			_job = await _job.save()
		}
		info.resume.job._id = _job._id
		info.resume.job.name = _job.name
		let personOldInfo = await Person.queryAllByAcountId(user._id)
		let personInfo = _.extend(personOldInfo,info)
		newInfo = await personInfo.save()
	}else if(user.role === 1){
		let companyOldInfo  = await Company.queryAllByAcountId(user._id)
		let companyInfo = _.extend(companyOldInfo,info)
		newInfo = await companyInfo.save()
	}else if(user.role === 2){
		let adminstratorOldInfo = await Adminstrator.queryAllByAcountId(user._id)
		let adminstratorInfo = _.extend(adminstratorOldInfo,info)
		newInfo = await adminstratorInfo.save()
	}
	res.send({code:200,info:newInfo,user:user})
}

exports.test  = (req,res) => {
	res.send({result:'test'})
}