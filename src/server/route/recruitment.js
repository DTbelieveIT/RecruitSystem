import Message from '../models/message'
import User from '../models/user'
import Recruitment from '../models/recruitment'
import moment from 'moment'
import _ from 'underscore'
import mysocket from '../socket'

const RecruitmentRoute = {
	'POST /delivery':async function(data){
		let {recruitmentId,userId,companyId,job} = data
		let info = await Recruitment.fetchById(recruitmentId)
		let existed = info.person.some((item) => {
			if(item.user._id.toString() === userId){
				return true
			}
			return false
		})
		if(existed){
			console.log('抱歉你已经投递过简历了')
			this.end(500,'sorry,you have delivery this position!')
		}else{
			console.log('新投递者')
			info.person.push({user:userId})
			await info.save()
			info = await Recruitment.fetchById(recruitmentId)
			//转发到消息盒子的内容，先保存到消息数据库
			let newMessage = new Message({
				from:userId,
				to:companyId,
				content:`投递了贵司的${job}职位!`,
				msgType:'resume',
				recruitment:recruitmentId,
			})		
			let message = await newMessage.save()	
			message = await Message.findOne({_id:message._id}).populate('from','account imgPath')
			if(mysocket.checkIsOnline(companyId)){
				console.log('企业在线')
				mysocket.getSocket(companyId).emit('new message',{
					from:message.from._id,
					imgPath:message.from.imgPath,
					account:message.from.account,
					content:message.content,
					createAt:moment(message.meta.createAt).format('YYYY-MM-DD HH:mm:ss'),
				})
			}else{
				console.log('企业不在线')
			}
			this.end(200,info)
		}
	},	
	'POST /updateStatus':async function(data){
		let {uid,rid,cid,status,evaluate} = data
		if(status === 0){
			return this.end(500,'you must be handle it!')
		}


		let info = await Recruitment.fetchById(rid)
		let target = info.person.find((item) => {
			return item.user._id.toString() === uid
		})
		//与旧person信息合并
		target['status'] = status
		target['evaluate'] = evaluate ? evaluate : ''
		let newPersons = _.extend(info.person,target)
		info.person = newPersons
		//保存到数据库
		let newInfo = await info.save()

		let content
		if(status === 1){
			content = '抱歉,你被拒绝了,点击可以查看评价!'
		}else if(status === 2){
			content = '恭喜你进入面试阶段,请好好准备!'
		}else if(status === 3){
			content = '抱歉,面试失败了,点击可以查看评价!'
		}else if(status === 4){
			content = '恭喜啦,面试成功!'
		}

		//更新旧消息为已读
		let result = await Message.update({to:cid,from:uid,msgType:'resume',recruitment:rid,readed:false},{$set:{readed:true}})
		console.log('更新用户发给我的面试消息')		

		//转发到消息盒子的内容，先保存到消息数据库
		let newMessage = new Message({
			from:cid,
			to:uid,
			content:content,
			msgType:'resume',
			recruitment:rid,
		})	
		let message = await newMessage.save()	
		message = await Message.findOne({_id:message._id}).populate('from','account imgPath')
		if(mysocket.checkIsOnline(uid)){
			console.log('用户在线')
			mysocket.getSocket(uid).emit('new message',{
				from:message.from._id,
				imgPath:message.from.imgPath,
				account:message.from.account,
				content:message.content,
				createAt:moment(message.meta.createAt).format('YYYY-MM-DD HH:mm:ss'),
				msgType:'resume',
			})
		}else{
			console.log('用户不在线')
		}

		this.end(200,{message:{uid:uid,msgType:'resume',rid:rid},newInfo:newInfo})
	}
}

module.exports = RecruitmentRoute;