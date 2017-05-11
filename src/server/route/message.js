import Message from '../models/message'
import User from '../models/user'
import mysocket from '../socket'
import moment from 'moment'
import {warn,error,notice} from '../util/util'
import mongoose from 'mongoose'

let ObjectId = mongoose.Types.ObjectId

const MessageRoute = {
	'POST /addMessage':async function(data){
		let {meId,linkmanId,content} = data
		console.log('sender的socket： '+ (mysocket.checkIsOnline(meId) ? mysocket.getSocket(meId).id : '用户不在线'))
		console.log('receiver的socket： '+ (mysocket.checkIsOnline(linkmanId) ? mysocket.getSocket(linkmanId).id : '用户不在线'))
		
		//保存到数据库
		let newMessage = new Message({
			from:meId,
			to:linkmanId,
			content:content,
			msgType:'chat',
		})
		let message = await newMessage.save()
		message = await Message.findOne({_id:message._id}).populate('from','account imgPath')
		if(mysocket.checkIsOnline(linkmanId)){
			console.log(error('用户在线'))
			mysocket.getSocket(linkmanId).emit('new message',{from:message.from._id,imgPath:message.from.imgPath,account:message.from.account,content:message.content,createAt:moment(message.meta.createAt).format('YYYY-MM-DD HH:mm:ss')})
		}else{
			console.log(notice('用户不在线'))
		}

		this.end(200,message)
	},
	'GET /getHistoryMessage':async function(data){
		let {linkmanId,meId,msgType} = data
		//更新消息为已读
		let result = await Message.update({to:meId,from:linkmanId,msgType:msgType,readed:false},{$set:{readed:true}},{multi:true})
		console.log('更新linkmanId发给我的消息')

		//查找与linkman的消息内容
		let messages = await Message.find({$or:[{from:linkmanId,to:meId,msgType:msgType},{from:meId,to:linkmanId,msgType:msgType}]}).populate('from','account imgPath')
		messages = messages.map((message) => {
			return {content:message.content,from:message.from._id,account:message.from.account,imgPath:message.from.imgPath,createAt:moment(message.meta.createAt).format('YYYY-MM-DD HH:mm:ss')}
		})
		this.end(200,{messages,data})
	},
	'GET /getUnreadMessage':async function(data){
		let {userid} = data
		let unread = await Message.find({to:userid,readed:false}).populate('from','account')
		this.end(200,unread)
	},
	'GET /getLinkmans':async function(data){
		let {userid} = data
		let linkmans = await Message.aggregate([{$match:{to:ObjectId(userid)}},{$group:{_id:{from:"$from",to:"$to"},number:{$sum:1}}}])
		linkmans = linkmans.map(function(linkman){
			return linkman._id.from
		})
		linkmans = await User.find({_id: linkmans},'-password')
		this.end(200,linkmans)
	},	
}

module.exports = MessageRoute;