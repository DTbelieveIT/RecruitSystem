//controllers
import User from '../src/server/controllers/user'
import Recruitment from '../src/server/controllers/recruitment'
import Message from '../src/server/controllers/message'

module.exports = function(app){
	//User
	app.post('/api/logon',User.signup)
	app.post('/api/login',User.signin)
	app.post('/api/updateInfo',User.updateInfo)

	//Recruitment
	app.post('/api/addRecruitment',Recruitment.addRecruitment)
	app.get('/api/queryJobList',Recruitment.queryJobList)
	app.get('/api/recruitmentList',Recruitment.recruitmentList)

	//Message
	app.get('/api/getHistoryMessage',Message.getHistoryMessage)

	//test api
	app.get('/api/test',User.test)
}