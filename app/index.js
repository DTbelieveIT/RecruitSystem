import React from 'react'
import { render } from 'react-dom'
import { Router,Route,IndexRoute,browserHistory } from 'react-router'
import {Provider} from 'react-redux'
import configStore from './store/ConfigStore'
import App from './views/App'
require('./style/index.less')

const store = configStore()

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

render((
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path="/" component={App}>
				<IndexRoute getComponent={Home}/>
				<Route path="company" getComponent={Company}/>
				<Route path="experience" getComponent={Experience}/>
			</Route>
			<Route path="login" getComponent={Login}/>
			<Route path="logon" getComponent={Logon}/>
		</Router>
	</Provider>
),document.getElementById('app'))