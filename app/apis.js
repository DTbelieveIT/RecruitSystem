import {dictToString,dictToJson} from './util'
// import 'whatwg-fetch'
// import Promise from 'promise-polyfill'

// //低版本的浏览器不支持promise
// if(!window.Promise){
// 	window.Promise = Promise;
// }

let basePath = '/api'

let data = {
	headers:{
		'Content-Type':'application/json',
		'Access-Control-Allow-Origin':'*'
	},
	mode:'cors',
	cache:'default',
}

export default function(params){
	if(params.requests.length > 1){
		alert('fetchAllData')
		fetchAllData(params)
		// fetchAllData(params)
	}else{
		alert('fetchData')
		switch(params.requests[0].method){
			case 'GET':
				console.log(params)
				params.requests[0].query = params.requests[0].query === undefined ? '' : ('?' + dictToString(params.requests[0].query))
				return fetchData(params,Object.assign({},{
					method:params.requests[0].method
				},data))			
			case 'POST':
			case 'DELETE':
				params.requests[0].query = params.requests[0].query === undefined ? '' : JSON.stringify(params.requests[0].query)
				return fetchData(params,Object.assign({},{
					method:params.requests[0].method,
					body:params.requests[0].query
				},data))
		}
	}
}

function fetchAllData(params){
	Promise.all(params.requests.map(request => {
		return fetch(basePath+request.path+'?'+dictToString(request.query),data)
		.then(res=>res.json())
	}))
	.then(json=>{
		params.onSuccess(json)
	})
	.catch(error=>{
		console.log(error)
		params.onFail(error)
	})
}

function fetchData(params,data){
	return fetch(basePath+params.requests[0].path+(data.method !== 'GET' ? '' : params.requests[0].query),data)
		.then(res=>res.json())
		.then(checkStatus)
		.then(json=>{
			params.onSuccess(json)
		})
		.catch(error=>{
			console.log(error)
			params.onFail(error)
		})
}

function checkStatus(response){
	console.log(response)
	if(response.code >= 200 && response.code <= 304){
		return response
	}else{
		var error = new Error(response.message)
		error.response = response
		throw error
	}
}