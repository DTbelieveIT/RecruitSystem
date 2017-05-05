import Message from '../models/message'

const MessageRoute = {
	'POST /addMessage':async function(data){
		let message = new Message({
			from:data.meId,
			to:data.linkmanId,
			content:data.content
		})

		await message.save()
		let newMessage = await Message.fetchById(message._id)
		this.end(200,newMessage)
	},
	'GET /getHistoryMessage':async function(){
		let info = await Message.fetch()
		this.end(200,info)
	}
}

module.exports = MessageRoute;