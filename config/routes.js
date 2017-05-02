//controllers
import User from '../controllers/user'
import Recruitment from '../controllers/recruitment'
import File from '../controllers/file'

module.exports = function(app){
	//User
	app.post('/api/logon',User.signup)
	app.post('/api/login',User.signin)
	app.post('/api/updateInfo',User.updateInfo)
	app.get('/api/test',User.test)

	//Recruitment
	app.post('/api/addRecruitment',Recruitment.addRecruitment)
	app.get('/api/queryJobList',Recruitment.queryJobList)
	app.get('/api/recruitmentList',Recruitment.recruitmentList)
}