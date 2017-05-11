import User from '../models/user'
import Adminstrator from '../models/adminstrator'
import Person from '../models/person'
import Company from '../models/company'
import jwt from 'jwt-simple'
import isLogin from '../police/isLogin'
import appConfig from '../../../config/app.config'
import mysocket from '../socket'

const AuthRoute = {
	'POST /auth':async function(data){
		let _user = data,isMatch = false,info
		let {account,password} = _user

		await User.findOne({
			account
		},function(err,user){
			if(err){
				console.log(user)
			}
			_user = user
		})

		if(!_user){
			return this.end(500,'user not exist')
		}

		isMatch = _user.comparePassword(password,_user.password)

		if(!isMatch){
			return this.end(500,'password is not match')
		}

		//判断用户是否在线
		if(mysocket.checkIsOnline(_user._id)){
			console.log('sorry,you have login,please logout first!')
			return this.end(500,'sorry,you have login,please logout first!')
		}

		//用户id对应sid
		console.log('++++++++++++++++++++++++')
		console.log('新加入的user'+_user._id)
		console.log('新加入的socketid'+this.socket.id)
		mysocket.uTos(_user._id,this.socket.id)
		console.log('++++++++++++++++++++++++')

		//生成token
		let token = jwt.encode({userId:_user._id,ip:this.socket.handshake.address,expires:Date.now() + (1000 * 60 * 60 * 24 * 7)},appConfig.jwtSecret)

		//获取用户详细信息
		if(_user.role === 0){
			info = await Person.queryAllByAcountId(_user._id)
		}else if(_user.role === 1){
			info = await Company.queryAllByAcountId(_user._id)
		}else if(_user.role === 2){
			info = await Adminstrator.queryAllByAcountId(_user._id)
		}
		return this.end(200,{user:_user,token:token,info:info})
	},
	'DELETE /auth':async function(){
		let auth = await Auth.findOne({clients:this.socket.id})
		if(!auth){
			return this.end(500,'you have not login')
		}

		//用户登出时删除该socket的所有对应关系
		mysocket.delSocket(this.socket.id)

		this.end(200)
	},
	'POST /auth/re':async function(data){
		let info
		isLogin(this.socket,data,this.end)

		//获取用户账号信息
		let _user = await User.findOne({_id:this.socket.user},'-password')

		//判断用户是否在线
		if(mysocket.checkIsOnline(_user._id)){
			console.log('sorry,you have login,please logout first!')
			return this.end(500,'sorry,you have login,please logout first!')
		}

		//用户id对应sid
		console.log('++++++++++++++++++++++++')
		console.log('重连的user'+_user._id)
		console.log('重连的socketid'+this.socket.id)
		mysocket.uTos(_user._id,this.socket.id)
		console.log('++++++++++++++++++++++++')

		//获取用户详细信息
		if(_user.role === 0){
			info = await Person.queryAllByAcountId(_user._id)
		}else if(_user.role === 1){
			info = await Company.queryAllByAcountId(_user._id)
		}else if(_user.role === 2){
			info = await Adminstrator.queryAllByAcountId(_user._id)
		}

		console.log('用户已重连')
		return this.end(200,{user:_user,info:info})
	},
}

module.exports = AuthRoute;