import React from 'react'
import { render } from 'react-dom'
import { Router,Route,IndexRoute } from 'react-router'
import {Provider} from 'react-redux'
import store from './store/ConfigStore'
import defineHistory from './history'
import App from './views/App'

//home
const Home = (location,callback) => {
	require.ensure([],require => {
		callback(null,require('./views/main/Home'))
	},'Home')
}

//login
const Login = (location,callback) => {
	require.ensure([],require => {
		callback(null,require('./views/login/Login'))
	},'Login')
}

const Logon = (location,callback) => {
	require.ensure([],require => {
		callback(null,require('./views/login/Logon'))
	},'Logon')
}

//main
const Main = (location,callback) => {
	require.ensure([],require => {
		callback(null,require('./views/main/Main'))
	},'Main')
}

//user
const Setting = (location,callback) => {
	require.ensure([],require => {
		callback(null,require('./views/main/user/Setting'))
	},'Setting')
}

//recruitment
const RecruitmentList = (location,callback) => {
	require.ensure([],require => {
		callback(null,require('./views/main/recruitment/RecruitmentList'))
	},'RecruitmentList')
}

const AddRecruitment = (location,callback) => {
	require.ensure([],require => {
		callback(null,require('./views/main/recruitment/AddRecruitment'))
	},'AddRecruitment')
}

const RecruitmentDetail = (location,callback) => {
	require.ensure([],require => {
		callback(null,require('./views/main/recruitment/RecruitmentDetail'))
	},'RecruitmentDetail')
}

const RecruitmentManage = (location,callback) => {
	require.ensure([],require => {
		callback(null,require('./views/main/recruitment/RecruitmentManage'))
	},'RecruitmentManage')
}

const RecruitmentSetting = (location,callback) => {
	require.ensure([],require => {
		callback(null,require('./views/main/recruitment/RecruitmentSetting'))
	},'RecruitmentSetting')
}

const DeliveryManage = (location,callback) => {
	require.ensure([],require => {
		callback(null,require('./views/main/recruitment/DeliveryManage'))
	},'DeliveryManage')	
}

const DeliveryDetail = (location,callback) => {
	require.ensure([],require => {
		callback(null,require('./views/main/recruitment/DeliveryDetail'))
	},'DeliveryDetail')	
}

//admin
const UserAdmin = (location,callback) => {
	require.ensure([],require => {
		callback(null,require('./views/main/admin/UserAdmin'))
	},'UserAdmin')	
}

const RecruitmentAdmin = (location,callback) => {
	require.ensure([],require => {
		callback(null,require('./views/main/admin/RecruitmentAdmin'))
	},'RecruitmentAdmin')	
}

const UserSetting =  (location,callback) => {
	require.ensure([],require => {
		callback(null,require('./views/main/admin/UserSetting'))
	},'UserSetting')	
}

const UserDetail =  (location,callback) => {
	require.ensure([],require => {
		callback(null,require('./views/main/admin/UserDetail'))
	},'UserDetail')	
}

//chat
const Chat = (location,callback) => {
	require.ensure([],require => {
		callback(null,require('./views/main/chat/Chat'))
	},'Chat')
}

render((
	<Provider store={store}>
		<Router history={defineHistory}>
			<Route path="/" component={App}>
				<IndexRoute getComponent={Home}/>
				<Route path="login" getComponent={Login}/>
				<Route path="logon" getComponent={Logon}/>
				<Route path="main" getComponent={Main}>
					<IndexRoute getComponent={RecruitmentList}/>
					<Route path="addRecruitment" getComponent={AddRecruitment}/>
					<Route path="recruitmentList" getComponent={RecruitmentList}/>
					<Route path="/detail/:id" getComponent={RecruitmentDetail}/>
					<Route path="/recruitment/:cid" getComponent={RecruitmentManage}/>
					<Route path="/recruitment/:uid/:rid" getComponent={RecruitmentSetting}/>
					<Route path="/delivery/:uid" getComponent={DeliveryManage}/>
					<Route path="/delivery/:uid/:rid" getComponent={DeliveryDetail}/>
					<Route path="setting" getComponent={Setting}/>
					<Route path="/chat/:id" getComponent={Chat} />			
					<Route path="/admin/user" getComponent={UserAdmin} />			
					<Route path="/admin/recruitment" getComponent={RecruitmentAdmin} />			
					<Route path="/admin/setting/:role/:id" getComponent={UserSetting}/>
					<Route path="/admin/detail/:role/:id" getComponent={UserDetail}/>
				</Route>
			</Route>
		</Router>
	</Provider>
),document.getElementById('app'))
