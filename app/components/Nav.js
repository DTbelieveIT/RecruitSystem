import React,{Component} from 'react'
import {Link} from 'react-router'
import '../style/Nav.less'

class Nav extends Component{
	render(){
		return (
			<div className='main'>
				<div className='left'>
					<Link to="/">首页</Link>{' '}
					<Link to="/company">公司</Link>{' '}
					<Link to="/experience">面经</Link>
				</div>
				<div className='right'>
					<Link to="/login">登录</Link>{' '}
					<Link to="/logon">注册</Link>
				</div>
			</div>
		)
	}
}

export default Nav