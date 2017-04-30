//controllers
import User from '../controllers/user'

module.exports = function(app){
	//User
	app.post('/api/logon',User.signup)
	app.post('/api/login',User.signin)
	app.post('/api/updateInfo',User.updateInfo)
	app.get('/api/test',User.test)
}