import React from 'react'
import { render } from 'react-dom'
import { Router,Route,IndexRoute } from 'react-router'
import {Provider} from 'react-redux'
import store from './store/ConfigStore'
import defineHistory from './history'
import App from './views/App'
require('./style/index.less')

const Home = (location,callback) => {
	require.ensure([],require => {
		callback(null,require('./views/Home'))
	},'Home')
}

const Company = (location,callback) => {
	require.ensure([],require => {
		callback(null,require('./views/Company'))
	},'Company')
}

const Experience = (location,callback) => {
	require.ensure([],require => {
		callback(null,require('./views/Experience'))
	},'Experience')
}

const Login = (location,callback) => {
	require.ensure([],require => {
		callback(null,require('./views/Login'))
	},'Login')
}

const Logon = (location,callback) => {
	require.ensure([],require => {
		callback(null,require('./views/Logon'))
	},'Logon')
}

const Setting = (location,callback) => {
	require.ensure([],require => {
		callback(null,require('./views/Setting'))
	},'Setting')
}

const AddRecruitment = (location,callback) => {
	require.ensure([],require => {
		callback(null,require('./views/AddRecruitment'))
	},'AddRecruitment')
}

const RecruitmentList = (location,callback) => {
	require.ensure([],require => {
		callback(null,require('./views/RecruitmentList'))
	},'RecruitmentList')
}

const RecruitmentDetail = (location,callback) => {
	require.ensure([],require => {
		callback(null,require('./views/RecruitmentDetail'))
	},'RecruitmentDetail')
}

const Chat = (location,callback) => {
	require.ensure([],require => {
		callback(null,require('./views/Chat'))
	},'Chat')
}

const Login1 = (location,callback) => {
	require.ensure([],require => {
		callback(null,require('./views/Login1'))
	},'Login1')
}

const Logon1 = (location,callback) => {
	require.ensure([],require => {
		callback(null,require('./views/Logon1'))
	},'Logon1')
}

const Agreement = (location,callback) => {
	require.ensure([],require => {
		callback(null,require('./views/Agreement'))
	},'Agreement')
}

render((
	<Provider store={store}>
		<Router history={defineHistory}>
			<Route path="/" component={App}>
				<IndexRoute getComponent={RecruitmentList}/>
				<Route path="company" getComponent={Company}/>
				<Route path="experience" getComponent={Experience}/>
				<Route path="login1" getComponent={Login1}/>
				<Route path="Logon1" getComponent={Logon1}/>
			</Route>
			<Route path="login" getComponent={Login}/>
			<Route path="logon" getComponent={Logon}/>
			<Route path="setting" getComponent={Setting}/>
			<Route path="addRecruitment" getComponent={AddRecruitment}/>
			<Route path="recruitmentList" getComponent={RecruitmentList}/>
			<Route path="/detail/:id" getComponent={RecruitmentDetail}/>
			<Route path="/chat/:id/:account" getComponent={Chat} />			
			<Route path="agreement" getComponent={Agreement}/>
		</Router>
	</Provider>
),document.getElementById('app'))