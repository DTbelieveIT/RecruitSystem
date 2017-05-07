import jwt from 'jwt-simple'
import appConfig from '../../../config/app.config'

function isLogin(socket,data,end){
	if(!data.token){
		return end(403,'need token but not exist!')
	}
	let payload = null
	try{
		payload = jwt.decode(data.token,appConfig.jwtSecret)
	}catch(err){
        if (err.message === 'Signature verification failed') {
            return end(403, 'invalid token');
        }
        return end(500,'server error when run police isLogin')
	}
	if(payload.ip !== socket.handshake.address){
		return end(403,'your ip not same as token payload ip')
	}
	if(payload.expires < Date.now()){
		return end(403,'token expires over')
	}

    socket.user = payload.userId
}

module.exports = isLogin