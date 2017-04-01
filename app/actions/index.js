import {
	REQUEST_DATA,REQUEST_FAIL,RECEIVE_DATA,
	LOGIN,LOGON,
	ACCOUNT,PASSWORD,PASSWORD_CONFIRM,
	CODE,CODE_TIMER
} from '../constants/Const'

export function updateEditText(value,kind){
	return {
		type:kind,
		value
	}
}