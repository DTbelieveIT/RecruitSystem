import {combineReducers} from 'redux'
import {
	REQUEST_DATA,REQUEST_FAIL,RECEIVE_DATA,
	LOGIN,LOGON,LOGOUT,
	ACCOUNT,PASSWORD,PASSWORD_CONFIRM,
	PHONE,NAME,EMAIL,JOB,ADDRESS,SIZE,FOUNDAT,
	CLEAR,
	UPDATEINFO,
	QUERYJOBLIST,ADDRECRUITMENT,RECRUITMENTLIST,
	ADDMESSAGE,GETHISTORYMESSAGE,UPDATEMESSAGE,
	LOGINSUCCESS,ONLINE,OFFLINE,INITIALIZE,
	OPENNOTIFICATION,CLOSENOTIFICATION
} from '../constants/Const'

let initialState = {
	online:false
}

/**
 * 登录的reducer
 */
function loginReducer(state={
	data:{
		code:500,
	},
},action){
	switch (action.type) {
		case REQUEST_DATA + LOGIN:
			return Object.assign({}, state, {
				status: 0
			});
		case RECEIVE_DATA + LOGIN:
			return Object.assign({}, state, {
				data: action.data,
				status: 1,
			});
		case REQUEST_FAIL + LOGIN:
			return Object.assign({}, state, {
				status: -1
			});
		case LOGIN + ACCOUNT:
			return Object.assign({}, state, {
				account:action.value,
			});
		case LOGIN + PASSWORD:
			return Object.assign({}, state, {
				password:action.value,
			});
		case LOGIN + CLEAR:
			return Object.assign({},state,{
				account:'',
				password:''
			});
		case REQUEST_DATA + UPDATEINFO:
			return Object.assign({},state,{
				updateStatus:0
			});
		case RECEIVE_DATA + UPDATEINFO:
			return Object.assign({},state,{
				updateStatus:1,
				data:action.data
			});
		case REQUEST_FAIL + UPDATEINFO:
			return Object.assign({},state,{
				updateStatus:-1
			});
		case UPDATEINFO + CLEAR:
			return Object.assign({},state,{
				updateStatus:-3
			});			
		case LOGOUT:
			return initState
		default:
			return state;
	}
}


/**
 * 注册的reducer
 */
function logonReducer(state={
	data:{
		code:500,
	},
},action){
	switch (action.type) {
		case REQUEST_DATA + LOGON:
			return Object.assign({}, state, {
				status: 0
			});
		case RECEIVE_DATA + LOGON:
			return Object.assign({}, state, {
				data: action.data,
				status: 1,
			});
		case REQUEST_FAIL + LOGON:
			return Object.assign({}, state, {
				status: -1
			});
		case LOGON + ACCOUNT:
			return Object.assign({}, state, {
				account:action.value,
			});
		case LOGON + PASSWORD:
			return Object.assign({}, state, {
				password:action.value,
			});
		case LOGON + PASSWORD_CONFIRM:
			return Object.assign({}, state, {
				cpassword:action.value,
			});
		case LOGON + PHONE:
			return Object.assign({}, state, {
				phone:action.value,
			});
		case LOGON + NAME:
			return Object.assign({}, state, {
				name:action.value,
			});
		case LOGON + EMAIL:
			return Object.assign({}, state, {
				email:action.value,
			});
		case LOGON + JOB:
			return Object.assign({}, state, {
				job:action.value,
			});
		case LOGON + ADDRESS:
			return Object.assign({}, state, {
				address:action.value,
			});
		case LOGON + SIZE:
			return Object.assign({}, state, {
				size:action.value,
			});		
		case LOGON + FOUNDAT:
			return Object.assign({}, state, {
				foundAt:action.value,
			});
		case LOGON + CLEAR:
			return initState
		default:
			return state;
	}
}

/**
 * 招聘的reducer
 */
 function recruitmentReducer(state={},action){
	switch (action.type) {
		case REQUEST_DATA + ADDRECRUITMENT:
			return Object.assign({}, state, {
				status: 0
			});
		case RECEIVE_DATA + ADDRECRUITMENT:
			return Object.assign({}, state, {
				data: action.data,
				status: 1,
			});
		case REQUEST_FAIL + ADDRECRUITMENT:
			return Object.assign({}, state, {
				status: -1
			});
		case ADDRECRUITMENT + CLEAR:
			return {}
		case REQUEST_DATA + RECRUITMENTLIST:
			return Object.assign({}, state, {
				status: 0
			});
		case RECEIVE_DATA + RECRUITMENTLIST:
			return Object.assign({}, state, {
				data: action.data,
				status: 1,
			});
		case REQUEST_FAIL + RECRUITMENTLIST:
			return Object.assign({}, state, {
				status: -1
			});			
		case RECRUITMENTLIST + CLEAR:
			return Object.assign({},state,{
				status: 0
			})					
		default:
			return state;
	}
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
 function messageReducer(state={
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
	loginReducer,
	logonReducer,
	recruitmentReducer,
	messageReducer,
	recruitment,
	user,
	ui,
})