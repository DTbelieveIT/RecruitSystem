import store from '../store/ConfigStore'
import {QUERYJOBLIST,RECRUITMENTLIST,UPDATERECRUITMENT,UPDATERECRUITMESSAGE} from '../constants/Const'
import api from '../api/apis.js'
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
					console.log(response)
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
					console.log('修改招聘状态后更新state')
					console.log(response)
					dispatch({
						type:UPDATERECRUITMESSAGE,
						data:response.data,
					})
				}
				resolve(response)
			})
		})
	}
}


export default actions