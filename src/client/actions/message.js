import {
	ADDMESSAGE,GETHISTORYMESSAGE,UPDATEMESSAGE
} from '../constants/Const'

export function addMessage(data){
	return {
		type:ADDMESSAGE,
		data
	}
}


export const getHistoryMessage = (path) => {
	return (dispatch, getState) => {
		fetch(path)
		.then(res=>res.json())
        .then((data) =>{
        	dispatch({type:GETHISTORYMESSAGE,data})
        })
	}
}

export function updateMessage(data){
	return {
		type:UPDATEMESSAGE,
		data
	}
}