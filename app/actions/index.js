import {
	REQUEST_DATA,REQUEST_FAIL,RECEIVE_DATA,
	LOGIN,LOGON,
	ACCOUNT,PASSWORD,PASSWORD_CONFIRM,
	CODE,CODE_TIMER
} from '../constants/Const'
import api from '../apis'

export function updateEditText(value,kind){
	return {
		type:kind,
		value
	}
}

/**
 * 如果需要则开始获取数据
 */
export function fetchDataIfNeed(...requests){
	return (dispatch,getState) => {
		if(shouldFetchData(getState(),requests,dispatch)){
			return dispatch(fetchData(requests))
		}
	}
}

/**
* 判断是否需要获取数据，若需要则返回true
*/
function shouldFetchData(state,requests,dispatch){
	console.log(requests)
	switch(requests[0].category){
		case LOGIN:
			break
		case LOGON:
			break
		default:
			break
	}
	return true
}

/**
* 发送请求的具体方法
*/
function fetchData(requests){
	return dispatch => {
		dispatch(requestData(requests[0]))
		return api({
			requests,
			onSuccess:json => dispatch(receiveData(requests[0],json)),
			onFail:error => dispatch(requestFail(requests[0]))
		})
	}
}

/**
 * 开始请求
 */
function requestData(requests){
	return {
		type:REQUEST_DATA + requests.category,
		requests
	}
}

/**
* 接受数据
*/
function receiveData(requests,json){
	return {
		type:RECEIVE_DATA + requests.category,
		requests,
		data:json
	}
}

/**
* 请求失败
*/
function requestFail(requests){
	return {
		type:REQUEST_FAIL + requests.category,
		requests
	}
}