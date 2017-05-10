import store from '../store/ConfigStore'
import {ADDMESSAGE,GETHISTORYMESSAGE,UPDATEMESSAGE} from '../constants/Const'
import api from '../api/apis.js'

let dispatch = store.dispatch

const actions = {
	getHistoryMessage:function(){
		return new Promise(resolve => {
			api({
				method:'GET',
				path:'/getHistoryMessage',
			}).then(response => {
				if(response.status === 200){
					dispatch({
						type:GETHISTORYMESSAGE,
						message:response.message,
					})
				}
				resolve(response)
			})
		})
	},
	addMessage:function(data){
		return new Promise(resolve => {
			dispatch({
				type:ADDMESSAGE,
				data
			})
		})
	},
	updateMessage:function(data){
		return new Promise(resolve => {
			dispatch({
				type:UPDATEMESSAGE,
				data
			})
			resolve(response)
		})
	},
	sendMessage:function(data){
		console.log('send')
		let myMessage = {...data}
		console.log(myMessage)
		// this.addMessage()
	}
}
// export const sendMessage = function(data) {
// 	console.log('send')
// 	let myMessage = {
// 		content:data.content,
// 		from:{account:data.me}
// 	}
// 	dispatch(addMessage(myMessage))
// 	socket.emit('message', data)
// }

export default actions