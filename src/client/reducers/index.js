import {combineReducers} from 'redux'
import {
	QUERYJOBLIST,RECRUITMENTLIST,  //recruitment
	GETHISTORYMESSAGE,UPDATEMESSAGE,GETUNREADMESSAGE,GETLINKMANS,MSGINITIALIZE, //message
	LOGINSUCCESS,ONLINE,OFFLINE,INITIALIZE,UPDATEINFO, //user
	OPENNOTIFICATION,CLOSENOTIFICATION  //ui
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
 		case GETHISTORYMESSAGE:
 			return {...state,message:action.data}
		case GETUNREADMESSAGE:
			return {...state,msgList:action.msgList}
		case GETLINKMANS:
			return {...state,linkmans:action.linkmans} 			
		case UPDATEMESSAGE:
			return {...state,msgList:state.msgList.filter((item)=>{return item.from._id !== action.data.linkmanId && item.msgType === action.data.msgType })}
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

export default combineReducers({
	message,
	recruitment,
	user,
	ui,
})