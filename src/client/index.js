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

const Agreement = (location,callback) => {
	require.ensure([],require => {
		callback(null,require('./views/login/Agreement'))
	},'Agreement')
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
				<Route path="agreement" getComponent={Agreement}/>
				<Route path="main" getComponent={Main}>
					<IndexRoute getComponent={RecruitmentList}/>
					<Route path="addRecruitment" getComponent={AddRecruitment}/>
					<Route path="recruitmentList" getComponent={RecruitmentList}/>
					<Route path="/detail/:id" getComponent={RecruitmentDetail}/>
					<Route path="setting" getComponent={Setting}/>
					<Route path="/chat/:id/:account" getComponent={Chat} />			
				</Route>
			</Route>
		</Router>
	</Provider>
),document.getElementById('app'))
