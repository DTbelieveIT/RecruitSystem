import path from 'path'
import _ from 'underscore'

import User from '../models/user'
import Adminstrator from '../models/adminstrator'
import Recruitment from '../models/recruitment'
import Person from '../models/person'
import Company from '../models/company'
import Job from '../models/job'

import {RSADecrypt} from '../../tools/RSADecrypt'
import appConfig from '../../../config/app.config'

let roles = ['person','company','adminstrator']
let {upload} = appConfig

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
	//头像上传成功即更新用户imgPath
	if(info.img && info.img.status === 'done'){
		let imgName = info.img.response.files[0].name
		let result = await User.update({account:account},{$set:{imgPath:path.join(upload.file.uploadUrl,imgName)}})
	}

	let user = await User.findByName(account)
	let newInfo
	//判断是否有修改密码，有则更新User的密码
	if(info.password !== undefined){
		user.password = info.password
		user = await user.save()
	}

	if(user.role === 0){

		//普通用户更新信息
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
		
		//简历和作品上传即更新旧Person的path
		if(info.files && _.every(info.files,function(file){return file.status === 'done'})){
			let resumePath = _.map(info.files,function(file){return path.join(upload.file.uploadUrl,file.response.files[0].name)})
			info.resume.path = [...personOldInfo.resume.path,...resumePath]
		}

		let personInfo = _.extend(personOldInfo,info)
		newInfo = await personInfo.save()
	}else if(user.role === 1){
		//企业用户更新信息
		let companyOldInfo  = await Company.queryAllByAcountId(user._id)
		let companyInfo = _.extend(companyOldInfo,info)
		newInfo = await companyInfo.save()
	}else if(user.role === 2){
		//管理员用户更新信息
		let adminstratorOldInfo = await Adminstrator.queryAllByAcountId(user._id)
		let adminstratorInfo = _.extend(adminstratorOldInfo,info)
		newInfo = await adminstratorInfo.save()
	}
	res.send({code:200,info:newInfo,user:user})
}

exports.test  = async (req,res) => {
	let {id,uid} = req.query
	let info = await Recruitment.fetchById(id)
	console.log(info.person)
	let result = info.person.find(function(person){
		//严格等于时不相等，可能是ObjectId类型
		return person._id == uid
	})
	if(!result){
		console.log('新投递者')
		await Recruitment.update({_id:id},{$push:{person:uid}})
	}
	res.send({result:info})
}