var User = require('../src/server/models/user')
var Adminstrator = require('../src/server/models/adminstrator')
var appConfig = require('./app.config')
var rootConfig = appConfig.rootAccount

exports.initRoot = async function(){
	let user = await User.findOne({account:'root'})
	if(user){
		console.log('root account existed')
		return 'OK'
	}
	let rootAccount = new User({
		account:rootConfig.account,
		password:rootConfig.password,
		role:rootConfig.role,
	})
	let _user = await rootAccount.save()
	let userObj = new Adminstrator({
		adminstrator:_user._id,
		name:rootConfig.name,
		phone:rootConfig.phone,
	})
	await userObj.save()
	return 'OK'
}