import React from 'react'
import { render } from 'react-dom'
import { Router,browserHistory } from 'react-router'
require('./index.less')

const rootRoute = {
	childRoutes: [{
		path:'/',
		component:require('./components/App'),
		childRoutes:[
			require('./routes/Company'),
			require('./routes/Experience')
		]
	}]
}

render((
	<Router 
		history={browserHistory}
		routes={rootRoute}
	/>
),document.getElementById('app'))