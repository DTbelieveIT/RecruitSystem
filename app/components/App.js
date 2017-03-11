import React , { Component }from 'react'
import Nav from './Nav'
var style = require('../style/App.less');

class App extends Component {
	render() {
		return (
			<div id={style.app}>
				<Nav />
				{this.props.children}
			</div>
		)
	}
}

module.exports = App