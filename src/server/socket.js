class Socket {
	//实例属性
	//sid到soc的map
	sidMapsoc = {}
	//uid到sid的map
	uidMapsid = {}

	uTos = (uid,sid) => {
		this.uidMapsid[uid] = sid
	}

	sTos = (sid,soc) => {
		this.sidMapsoc[sid] = soc
	}

	getSocket = (uid) => {
		return this.sidMapsoc[this.uidMapsid[uid]]
	}

	checkIsOnline = (uid) => {
		return this.sidMapsoc[this.uidMapsid[uid]] ? true : false
	}	

	delSocket = (sid) => {
		console.log(`${sid} is disconnect`)
		delete this.sidMapsoc[sid]

		for(let key of Object.keys(this.uidMapsid)){
			if(sid === this.uidMapsid[key]){
				delete this.uidMapsid[key]
			}
		}
	}

	current = () => {
		console.log('****************************************************')
		console.log('当前的socket数量(sTos)'+Object.keys(this.sidMapsoc).length)
		console.log(Object.keys(this.sidMapsoc))
		console.log('当前的socket数量(uTos)'+Object.keys(this.uidMapsid).length)
		console.log(this.uidMapsid)
		console.log('****************************************************')
	}	
}

module.exports =  new Socket()

// let Socket = (function(){
// 	//静态私有变量
// 	let sidMapsoc = {}
// 	let uidMapsid = {}

// 	//创建类
// 	function _socket(){
// 		//特权方法
// 		this.sTos = function(sid,soc){
// 			sidMapsoc[sid] = soc
// 		}

// 		this.uTos = function(uid,sid){
// 			uidMapsid[uid] = sid
// 		}	

// 		this.getSocket = function(uid){
// 			if(!uidMapsid[uid] && !sidMapsoc[uidMapsid[uid]]){
// 				return false
// 			}
// 			return sidMapsoc[uidMapsid[uid]]
// 		}
// 		this.delSocket = function(sid){
// 			for(var i in uidMapsid){
// 				if(uidMapsid[i] === sid){
// 					delete uidMapsid[i]
// 				}
// 			}
// 			delete sidMapsoc[sid]
// 			console.log('删除socketId: '+sid)
// 			console.log('当前的socket数量(sTos)'+Object.keys(sidMapsoc).length)
// 			console.log('当前的socket数量(uTos)'+Object.keys(uidMapsid).length)
// 			console.log(uidMapsid)
// 		}
// 		this.current = function(){
// 			console.log('****************************************************')
// 			console.log('当前的socket数量(sTos)'+Object.keys(sidMapsoc).length)
// 			console.log(Object.keys(sidMapsoc))
// 			console.log('当前的socket数量(uTos)'+Object.keys(uidMapsid).length)
// 			console.log(uidMapsid)
// 			console.log('****************************************************')
// 		}
// 	}
// 	return new _socket()
// })()

// module.exports = Socket