import {dictToString,dictToJson} from '../util/util'
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

export default function(...params){
	if(params.length > 1){
		fetchAllData(params)
	}else{
		switch(params[0].method){
			case 'GET':
				params[0].query = params[0].query === undefined ? '' : ('?' + dictToString(params[0].query))
				return fetchData(params,Object.assign({},{
					method:params[0].method
				},data))			
			case 'POST':
			case 'DELETE':
				params[0].query = params[0].query === undefined ? '' : JSON.stringify(params[0].query)
				return fetchData(params,Object.assign({},{
					method:params[0].method,
					body:params[0].query
				},data))
		}
	}
}

function fetchAllData(params){
	Promise.all(params.map(request => {
		return fetch(basePath+request.path+'?'+dictToString(request.query),data)
		.then(res=>res.json())
	}))
}

function fetchData(params,data){
	return fetch(basePath+params[0].path+(data.method !== 'GET' ? '' : params[0].query),data)
		.then(res=>res.json())
}

