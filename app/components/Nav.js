import React,{Component} from 'react'
import {Link} from 'react-router'
var style = require('../style/Nav.less')

class Nav extends Component{
	render(){
		return (
			<div className={style.main}>
				<div className={style.left}>
					<Link to="/">首页</Link>{' '}
					<Link to="/company">公司</Link>{' '}
					<Link to="/experience">面经</Link>
				</div>
				<div className={style.right}>
					<Link to="/login">登录</Link>{' '}
					<Link to="/logon">注册</Link>
				</div>
			</div>
		)
	}
}

export default Nav