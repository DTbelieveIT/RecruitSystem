//controllers
import User from '../controllers/user'

module.exports = function(app){
	//User
	app.post('/api/logon',User.signup)
	app.post('/api/login',User.signin)
	app.get('/api/test',function(req,res){
		res.send({result:200})
	})
}