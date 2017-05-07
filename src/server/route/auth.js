import User from '../models/user'
import Adminstrator from '../models/adminstrator'
import Person from '../models/person'
import Company from '../models/company'
import Auth from '../models/auth'
import jwt from 'jwt-simple'
import isLogin from '../police/isLogin'
import appConfig from '../../../config/app.config'

const AuthRoute = {
	'POST /auth':async function(data){
		let _user = data,isMatch = false,info
		let {account,password} = _user

		let auths = await Auth.find({clients:this.socket.id})
		if(auths.length > 0){
			console.log('已经登录')
			return this.end(500,'you have login')
		}

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
		
		this.socket.join('system')

		//生成token
		let token = jwt.encode({userId:_user._id,ip:this.socket.handshake.address,expires:Date.now() + (1000 * 60 * 60 * 24 * 7)},appConfig.jwtSecret)

		let auth = await Auth.findOne({user:_user.id})
		if(!auth){
			auth = new Auth({
				user:_user.id,
				clients:[this.socket.id]
			})
		}else{
			auth.clients.push(this.socket.id)
		}
		await auth.save()
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
		this.socket.leave('system')
		if(auth.clients.length === 1){
			await auth.remove()
		}else{
			let index = auth.clients.indexOf(this.socket.id)
			auth.clients.splice(index,1)
			await auth.save()
		}
		this.end(200)
	},
	'POST /auth/re':async function(data){
		let info
		isLogin(this.socket,data,this.end)

		let auths = await Auth.find({clients:this.socket.id})

		if(auths.length > 0) {
			return this.end(401,'you have login,please logout first')
		}

		//获取用户账号信息
		let _user = await User.findOne({_id:this.socket.user},'-password')
		this.socket.join('system')

		let auth = await Auth.findOne({user:_user._id})
		if(!auth){
			auth = new Auth({
				user:_user._id,
				clients:[this.socket.id]
			})
		}else{
			auth.clients.push(this.socket.id)
		}
		await auth.save()

		//获取用户详细信息
		if(_user.role === 0){
			info = await Person.queryAllByAcountId(_user._id)
		}else if(_user.role === 1){
			info = await Company.queryAllByAcountId(_user._id)
		}else if(_user.role === 2){
			info = await Adminstrator.queryAllByAcountId(_user._id)
		}

		console.log('已重连')
		return this.end(200,{user:_user,info:info})
	},
}

module.exports = AuthRoute;