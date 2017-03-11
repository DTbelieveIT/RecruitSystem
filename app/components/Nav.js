import React,{Component} from 'react'
import {Link} from 'react-router'

class Nav extends Component{
	render(){
		return (
			<div>
				<Link to="/">首页</Link>{' '}
				<Link to="/company">公司</Link>{' '}
				<Link to="/experience">面经</Link>
			</div>
		)
	}
}

export default Nav