import {combineReducers} from 'redux'
import {
	REQUEST_DATA,REQUEST_FAIL,RECEIVE_DATA,
	LOGIN,LOGON,
	ACCOUNT,PASSWORD,PASSWORD_CONFIRM,
	PHONE,NAME,CLEAR
} from '../constants/Const'

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
		default:
			return state;
	}
}

let initState = {
	data:{
		code:500,
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
		case CLEAR:
			return initState
		default:
			return state;
	}
}

export default combineReducers({
	loginReducer,
	logonReducer,
})