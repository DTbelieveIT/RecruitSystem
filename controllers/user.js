import User from '../models/user'
import NodeRSA from 'node-rsa'
import privKey from '../config/rsa_1024_priv'

exports.signup = (req,res) => {
	let {account , password} = req.query
	let user = new User({
		account:account,
		password:password
	})
	user.save((err)=>{
		if(err) return next(err)
		res.send({staus:'success'})
	})
}

exports.signin = (req,res) => {
	let {account,password} = req.body
	var key = new NodeRSA(privKey)
	key.setOptions({encryptionScheme: 'pkcs1'});
	var decrypted = key.decrypt(password, 'utf8')
	console.log(decrypted)
	res.send({code:200})
}