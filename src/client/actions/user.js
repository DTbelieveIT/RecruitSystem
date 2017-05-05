import store from '../store/ConfigStore'
import socket from '../socket'
import {LOGINSUCCESS,LOGONSUCCESS} from '../constants/Const'
import api from '../apis1'

let dispatch = store.dispatch

const actions = {
	//用户登录
	login:function(userinfo){
		console.log('login...')
		return new Promise(resolve => {
			api({
				method:'POST',
				path:'/login',
				query:{...userinfo}
			}).then(response => {
				if(response.status === 200){
					dispatch({
						type:LOGINSUCCESS,
						user:response.data
					})
				}
				resolve(response)
			})
		})
	},
	//用户注册
	logon:function(userinfo){
		console.log('logon...')
		return new Promise(resolve => {
			api({
				method:'POST',
				path:'/logon',
				query:{...userinfo}
			}).then(response => {
				console.log(response)
				if(response.status === 200){
					dispatch({
						type:LOGONSUCCESS,
						user:response.data
					})
				}
				resolve(response)
			})
		})
	}

}

export default actions;


// export const sendMessage = function(data) {
// 	console.log('send')
// 	let myMessage = {
// 		content:data.content,
// 		from:{account:data.me}
// 	}
// 	dispatch(addMessage(myMessage))
// 	socket.emit('message', data)
// }

// import {
// 	ADDMESSAGE,GETHISTORYMESSAGE,UPDATEMESSAGE
// } from '../constants/Const'

// export function addMessage(data){
// 	return {
// 		type:ADDMESSAGE,
// 		data
// 	}
// }


// export const getHistoryMessage = (path) => {
// 	return (dispatch, getState) => {
// 		fetch(path)
// 		.then(res=>res.json())
//         .then((data) =>{
//         	dispatch({type:GETHISTORYMESSAGE,data})
//         })
// 	}
// }

// export function updateMessage(data){
// 	return {
// 		type:UPDATEMESSAGE,
// 		data
// 	}
// }