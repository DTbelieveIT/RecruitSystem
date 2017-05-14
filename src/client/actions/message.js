import store from '../store/ConfigStore'
import {GETUNREADMESSAGE,GETLINKMANS,MSGINITIALIZE,UPDATEMESSAGE,UPDATERECRUITMESSAGE} from '../constants/Const'
import api from '../api/apis'
import socket from '../socket'

let dispatch = store.dispatch

const actions = {
	init:function(){
		dispatch({
			type:MSGINITIALIZE
		})
	},
	getHistoryMessage:function(data){
		return new Promise(resolve => {
			socket.get('/getHistoryMessage',data,response => {
				if(response.status === 200){
					dispatch({
						type:UPDATEMESSAGE,
						data:response.data.data,
					})
				}
				resolve(response)
			})
		})		
	},
	addMessage:function(data){
		return new Promise(resolve => {
			socket.post('/addMessage',data,response => {
				resolve(response)
			})
		})
	},
	getUnreadMessage:function(userid){
		return new Promise(resolve => {
			socket.get('/getUnreadMessage',userid,response => {
				if(response.status === 200){
					if(response.data.length){
						console.log(`你有${response.data.length}条未读消息`)
						dispatch({
							type:'GETUNREADMESSAGE',
							msgList:response.data
						})
					}
				}			
				resolve(response)
			})
		})
	},
	getLinkmans:function(userid){
		return new Promise(resolve => {
			socket.get('/getLinkmans',userid,response => {
				if(response.status === 200){
					if(response.data.length){
						console.log(`你有${response.data.length}个联系人`)
						dispatch({
							type:'GETLINKMANS',
							linkmans:response.data
						})
					}
				}
				resolve(response)
			})
		})
	},
	updateRecruitMessage:function(data){
		return new Promise(resolve => {
			socket.post('/updateRecruitMessage',data,response => {
				if(response.status === 200){
					console.log('更新面试信息为已读')
					dispatch({
						type:'UPDATERECRUITMESSAGE',
						data:response.data.message
					})
				}
			})
		})
	},
}


export default actions