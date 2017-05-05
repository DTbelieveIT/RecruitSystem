import Message from '../models/message'

exports.saveMessage = async function(meId,linkmanId,content){
	let message = new Message({
		from:meId,
		to:linkmanId,
		content:content
	})
	await message.save()
	let newMessage = await Message.fetchByMId(message._id)
	return newMessage
}

exports.getHistoryMessage  = async (req,res) => {
	let info = await Message.fetch()
	res.send({result:info})
}