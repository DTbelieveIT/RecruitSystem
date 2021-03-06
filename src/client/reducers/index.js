import {combineReducers} from 'redux'
import {
	QUERYJOBLIST,RECRUITMENTLIST,UPDATERECRUITMENT,UPDATERECRUITMENTSTATUS,  //recruitment
	UPDATEMESSAGE,GETUNREADMESSAGE,GETLINKMANS,MSGINITIALIZE,UPDATERECRUITMESSAGE,UPDATESTATUSMESSAGE, //message
	LOGINSUCCESS,ONLINE,OFFLINE,INITIALIZE,UPDATEINFO, //user
	OPENNOTIFICATION,CLOSENOTIFICATION,  //ui
	GETALLUSERINFO,DELUSERINFO  //admin
} from '../constants/Const'

/**
 * recruitment的reducer
 */
 function recruitment(state={},action){
	switch (action.type) {
		case QUERYJOBLIST:
 			return {...state, jobs:action.jobs}
 		case RECRUITMENTLIST:
 			return {...state, infos:action.infos}
		case UPDATERECRUITMENT:
			let newInfos = state.infos.map((item) => {
				if(item._id === action.info._id){
					return action.info
				}
				return item
			})
			return {...state,infos:newInfos} 	
		case UPDATERECRUITMENTSTATUS:
			let infos = state.infos.map((item) => {
				if(item._id === action.info._id){
					return action.info
				}
				return item
			})			
			return {...state,infos:infos}		
		default:
			return state;
	}
}

/**
 * message的reducer
 */
let msgInitialState = {
 	message:[],
 	msgList:[],
 	linkmans:[],	
}

 function message(state=msgInitialState,action){
 	switch(action.type){
		case MSGINITIALIZE:
			return msgInitialState
		case GETUNREADMESSAGE:
			return {...state,msgList:action.msgList}
		case GETLINKMANS:
			return {...state,linkmans:action.linkmans} 			
		case UPDATEMESSAGE:
			return {...state,msgList:state.msgList.filter((item)=>{return !(item.from._id === action.data.linkmanId && item.msgType === action.data.msgType) })}
		case UPDATESTATUSMESSAGE:
			return {...state,msgList:state.msgList.filter((item)=>{
				return !(item.from._id === action.data.uid && item.msgType === action.data.msgType && item.recruitment === action.data.rid)
			})}
		case UPDATERECRUITMESSAGE:
			return {...state,msgList:state.msgList.filter((item) => {
				return !(item.to._id === action.data.uid && item.msgType === action.data.msgType && item.recruitment === action.data.rid)
			})}
 		default:
 			return state
 	}
 }

/**
*  user的reducer
*/
let userInitialState = {
	online:false
}
function user(state=userInitialState,action){
	switch(action.type){
		case INITIALIZE:
			return userInitialState
		case ONLINE:
			return {...state,online:true}
		case OFFLINE:
			return {...state,online:false}
		case LOGINSUCCESS:
			return {...state,user:action.user,info:action.info}
		case UPDATEINFO:
			return {...state,user:action.user,info:action.info}
		default:
			return state			
	}
}


/**
*  ui的reducer
*/
function ui(state={
	showNotification: false,
    notificationContent: '',
},action){
	switch(action.type){
		case OPENNOTIFICATION:
			return {...state,showNotification:true,notificationContent:action.content}
    	case CLOSENOTIFICATION: 
    		return {...state,'showNotification':false}			
 		default:
 			return state    		
	}
}


function admin(state={
	admins:[],
	people:[],
	companys:[],
},action){
	switch(action.type){
		case GETALLUSERINFO:
			return {...state,admins:action.data.admins,people:action.data.people,companys:action.data.companys}
		case DELUSERINFO:
			if(action.role === 0){
				return {...state,people:state.people.filter((item) => {return item._id!==action.id})}			
			}else if(action.role === 1){
				return {...state,companys:state.companys.filter((item) => {return item._id!==action.id})}
			}else if(action.role === 2){
				return {...state,admins:state.admins.filter((item) => {return item._id!==action.id})}
			}
		default:
			return state
	}
}

export default combineReducers({
	message,
	recruitment,
	user,
	ui,
	admin,
})