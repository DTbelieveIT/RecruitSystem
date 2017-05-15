import store from '../store/ConfigStore'
import socket from '../socket'
import {GETALLUSERINFO} from '../constants/Const'
import api from '../api/apis.js'


let dispatch = store.dispatch

const actions = {
	getAllUserInfo:function(){
		return new Promise(resolve => {
			socket.get('/getAllUserInfo',{},response => {
				if(response.status === 200){
					dispatch({
						type:GETALLUSERINFO,
						data:response.data,
					})
				}
				resolve(response)
			})
		})
	},
	//更新用户信息
	updateUserInfo:function(userinfo){
		return new Promise(resolve => {
			api({
				method:'POST',
				path:'/updateInfo',
				query:{...userinfo}
			}).then(response => {
				resolve(response)
			})
		})
	},	
}

export default actions;