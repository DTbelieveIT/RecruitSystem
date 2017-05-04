import React,{Component,PropTypes} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {LOGOUT} from '../constants/Const'
import { Menu, Dropdown, Icon } from 'antd'
import '../style/Nav.less'

class Nav extends Component{
	logout(){
		this.props.dispatch({type:LOGOUT})
	}

	render(){
		const menu = (
		  <Menu>
		    <Menu.Item>
				<Link to="/setting">设置</Link>{' '}
				<Link to="/" onClick={this.logout.bind(this)}>登出</Link>		    
			</Menu.Item>
		  </Menu>
		)
		return (
			<div className='main'>
				<div className='left'>
					<Link to="/">首页</Link>{' '}
					{this.props.isLogin && this.props.user.role === 1 ? (<Link to="/addRecruitment">发布招聘信息</Link>) : null}
					{' '}
					<Link to="/company">公司介绍页</Link>{' '}
					<Link to="/experience">面经交流论坛</Link>
				</div>
				<div className='right'>
					{this.props.isLogin ? (
						<div>
							<Dropdown overlay={menu}>
						    	<a className="ant-dropdown-link" href="#">
						      		{this.props.user.account} <Icon type="down" />
						    	</a>
						    </Dropdown>
						</div>
					) : (
						<div>
							<Link to="/login">登录</Link>{' '}
							<Link to="/logon">注册</Link>
						</div>
					)}
				</div>
			</div>
		)
	}
}

Nav.PropTypes = {
	isLogin:PropTypes.boolean,
	user:PropTypes.object
}

Nav.defaultProps = {
	isLogin:false,
	user:{}
}

function mapStateToProps(state){
	return {
		isLogin:state.loginReducer.status === 1,
		user:state.loginReducer.data.user || {}
	}
}

export default connect(mapStateToProps)(Nav)