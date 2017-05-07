import Recruitment from '../models/recruitment'
import Job from '../models/job'

//add recruitment
exports.addRecruitment = async function(req,res){
	let info = req.body
	let newJob
	let _recruitment
	if(info.newJob){
		newJob = new Job({name:info.newJob})
		newJob = await newJob.save()
		info.job = newJob._id
	}
	_recruitment = new Recruitment(info)
	await _recruitment.save(function(err,recruitment){
		if(err){
			console.log(err)
			res.send({status:500})
		}
	})
	res.send({status:200})
}

//query job list
exports.queryJobList = function(req,res){
	Job.fetch(function(err,jobs){
		if(err) console.log(err)
		res.send({status:200,jobs:jobs})
	})
}

//query recruitment info list
exports.recruitmentList = async function(req,res){
	let infos = await Recruitment.fetch()
	res.send({status:200,infos:infos})
} 

//update recruitment
exports.updateRecruitment = async function(req,res){

}