import User from '../models/user'

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