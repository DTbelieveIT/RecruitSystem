import {combineReducers} from 'redux'
import {
	REQUEST_DATA,REQUEST_FAIL,RECEIVE_DATA,
	LOGIN,LOGON,LOGOUT,
	ACCOUNT,PASSWORD,PASSWORD_CONFIRM,
	PHONE,NAME,EMAIL,JOB,ADDRESS,SIZE,FOUNDAT,
	CLEAR
} from '../constants/Const'

let initState = {
	data:{
		code:500,
	}
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
			return Object.assign({},initState,{
				status:state.status,
				account:state.account
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

export default combineReducers({
	loginReducer,
	logonReducer,
})