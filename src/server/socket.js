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