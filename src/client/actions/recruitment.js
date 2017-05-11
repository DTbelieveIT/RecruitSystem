import store from '../store/ConfigStore'
import {QUERYJOBLIST,RECRUITMENTLIST} from '../constants/Const'
import api from '../api/apis.js'

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
}


export default actions