import React from 'react'
import { render } from 'react-dom'
import { Router,browserHistory } from 'react-router'
import {Provider} from 'react-redux'
import configStore from './store/ConfigStore'
require('./index.less')

const store = configStore()

const rootRoute = {
	childRoutes: [{
		path:'/',
		indexRoute:require('./routes/Home'),
		component:require('./components/App'),
		childRoutes:[
			require('./routes/Company'),
			require('./routes/Experience')
		]
	},{
		path:'login',
		component:require('./components/Login')
	},{
		path:'logon',
		component:require('./components/Logon')
	}]
}

render((
	<Provider store={store}>
		<Router 
			history={browserHistory}
			routes={rootRoute}
		/>
	</Provider>
),document.getElementById('app'))