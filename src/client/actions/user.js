import store from '../store/ConfigStore'
import socket from '../socket'
import {LOGINSUCCESS,LOGONSUCCESS,UPDATEINFO,ONLINE,OFFLINE,INITIALIZE} from '../constants/Const'
import api from '../api/apis.js'


let dispatch = store.dispatch

const actions = {
	//用户在线
	online:function(){
		return new Promise(resolve => {
			dispatch({
				type:ONLINE
			})
			resolve('success')
		})
	},
	//用户在线
	offline:function(){
		return new Promise(resolve => {
			dispatch({
				type:OFFLINE
			})
			resolve('success')
		})
	},
	//用户登录
	login:function(userinfo){
		console.log('login...')
		return new Promise(resolve => {
			socket.post('/auth',{...userinfo},response => {
				if(response.status === 200){
					dispatch({
						type:LOGINSUCCESS,
						user:response.data.user,
						info:response.data.info,
					})
					socket.setToken(response.data.token)
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
				resolve(response)
			})
		})
	},	
	//用户登出
	logout:function(){
		return new Promise(resolve => {
			socket.delete('/auth',{},response => {
				if(response.status === 200){
					socket.setToken('')
				}
				resolve(response)
			})
		})
	},
	//初始化
	init:function(){
		return new Promise(resolve => {
			dispatch({
				type:INITIALIZE
			})
			resolve('success')
		})
	},
	//更新用户信息
	updateInfo:function(userinfo){
		return new Promise(resolve => {
			api({
				method:'POST',
				path:'/updateInfo',
				query:{...userinfo}
			}).then(response => {
				console.log(response)
				dispatch({
					type:UPDATEINFO,
					user:response.user,
					info:response.info,
				})
				resolve(response)
			})
		})
	},
	reConnect:function(token){
		if(token){
			socket.setToken(token)
		}
		return new Promise(resolve => {
			socket.post('/auth/re',{},response => {
				if(response.status === 200){
					dispatch({
						type:LOGINSUCCESS,
						user:response.data.user,
						info:response.data.info,
					})
				}
				resolve(response)
			})
		})
	},
	// //用户登录
	// login:function(userinfo){
	// 	console.log('login...')
	// 	return new Promise(resolve => {
	// 		api({
	// 			method:'POST',
	// 			path:'/login',
	// 			query:{...userinfo}
	// 		}).then(response => {
	// 			if(response.status === 200){
	// 				dispatch({
	// 					type:LOGINSUCCESS,
	// 					user:response.data
	// 				})
	// 			}
	// 			resolve(response)
	// 		})
	// 	})
	// },
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