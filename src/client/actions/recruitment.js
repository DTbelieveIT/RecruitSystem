import store from '../store/ConfigStore'
import {QUERYJOBLIST,RECRUITMENTLIST,UPDATERECRUITMENT,UPDATESTATUSMESSAGE,UPDATERECRUITMENTSTATUS} from '../constants/Const'
import api from '../api/apis.js'
import ui from './ui'
import mysocket from '../socket'

let dispatch = store.dispatch

const actions = {
	queryJobList:function(){
		return new Promise(resolve => {
			api({
				method:'GET',
				path:'/queryJobList',
			}).then(response => {
				if(response.status === 200){
					dispatch({
						type:QUERYJOBLIST,
						jobs:response.jobs,
					})
				}
				resolve(response)
			})
		})
	},
	addRecruitment:function(data){
		return new Promise(resolve => {
			api({
				method:'POST',
				path:'/addRecruitment',
				query:{...data}
			}).then(response => {
				resolve(response)
			})
		})
	},
	queryRecruitmentList:function(){
		return new Promise(resolve => {
			api({
				method:'GET',
				path:'/recruitmentList'
			}).then(response => {
				dispatch({
					type:RECRUITMENTLIST,
					infos:response.infos,
				})
				resolve(response)
			})
		})
	},
	delivery:function(data){
		return new Promise(resolve => {
			mysocket.post('/delivery',data,response => {
				if(response.status === 200){
					console.log('投递成功后更新state')
					dispatch({
						type:UPDATERECRUITMENT,
						info:response.data,
					})					
				}
				resolve(response)
			})			
		})
	},
	updateStatus:function(data){
		return new Promise(resolve => {
			mysocket.post('/updateStatus',data,response => {
				if(response.status === 200){
					ui.openNotification('updateStatus success')
					dispatch({
						type:UPDATESTATUSMESSAGE,
						data:response.data.message,
					})
					dispatch({
						type:UPDATERECRUITMENTSTATUS,
						info:response.data.newInfo,
					})
				}
				resolve(response)
			})
		})
	}
}


export default actions