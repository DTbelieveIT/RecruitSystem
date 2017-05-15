import Adminstrator from '../models/adminstrator'
import Person from '../models/person'
import Company from '../models/company'

const AdminRoute = {
	'GET /getAllUserInfo':async function(){
		let admins = await Adminstrator.fetch()
		let people = await Person.fetch()
		let companys = await Company.fetch()
		this.end(200,{admins,people,companys})
	},
}

module.exports = AdminRoute