import {combineReducers} from 'redux'
import {
	QUERYJOBLIST,RECRUITMENTLIST,  //recruitment
	ADDMESSAGE,GETHISTORYMESSAGE,UPDATEMESSAGE, //message
	LOGINSUCCESS,ONLINE,OFFLINE,INITIALIZE,UPDATEINFO, //user
	OPENNOTIFICATION,CLOSENOTIFICATION  //ui
} from '../constants/Const'

let initialState = {
	online:false
}

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
 function message(state={
 	message:[]
 },action){
 	switch(action.type){
 		case ADDMESSAGE:
 			return {...state,message: {result:[...state.message.result,action.data, ]}}
 		case UPDATEMESSAGE:
 			return {...state,message: {result:[...state.message.result,action.data, ]}}
 		case GETHISTORYMESSAGE:
 			return {...state,message:action.data}
 		default:
 			return state
 	}
 }

/**
*  user的reducer
*/
function user(state=initialState,action){
	switch(action.type){
		case INITIALIZE:
			return initialState
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