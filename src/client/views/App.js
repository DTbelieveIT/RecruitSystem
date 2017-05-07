import React , { Component } from 'react'
import { Layout, Menu ,Icon} from 'antd'
import { connect } from 'react-redux'
import {Link} from 'react-router'
import defineHistory from '../history'
import Notification from '../components/Notification'
import MDropdown from '../components/Dropdown'
import user from '../actions/user'

import './App.less'

const {Header, Content, Footer} = Layout;

class App extends Component {
	constructor(props){
		super(props)
		this.state={
            value: "recruitmentList"
        }
	}

	componentWillMount(){
		// try auto login
        const token = window.localStorage.getItem('token');
        if (token && token !== '') {
            user
            .reConnect(token)
            .then(result => {
                if (result.status === 200) {
                    user.online();
                    if (this.props.location.pathname === '/') {
                    	defineHistory.push('/main')
                    }
                }
            });
        }
	}

    render() {	
        return (
            <div className="app">
				<Layout className="layout">
					<Notification />
				    <Header>
				     	<Link to="/">
				      		<div className="logo" />                            
                        </Link>
				      <Menu
				            theme="dark"
				            mode="horizontal"
				            defaultSelectedKeys={[this.state.value || 'recruitmentList']}
				            style={{
				                lineHeight: '64px'
				            }}
				            >
				        <Menu.Item key="setting">
 							<Link to="/">
                            	<span className="nav-text">简历管理</span>
                        	</Link>
				        </Menu.Item>
				        <Menu.Item key="recruitmentList">
 							<Link to="/">
                            	<span className="nav-text">招聘管理</span>
                        	</Link>
				        </Menu.Item>
				        <Menu.Item key="addRecruitment">
 							<Link to="/main/addRecruitment">
                            	<span className="nav-text">添加招聘信息</span>
                        	</Link>
				        </Menu.Item>
				        {this.props.online ? null : 
				        <Menu.Item key="login">
 							<Link to="login">
                            	<span className="nav-text">登录</span>
                        	</Link>
				        </Menu.Item>}
				        {this.props.online ? null :
				        <Menu.Item key="logon">
 							<Link to="logon">
                            	<span className="nav-text">注册</span>
                        	</Link>
				        </Menu.Item>}
				        {this.props.online ? <MDropdown role={this.props.user.role} account={this.props.user.account}/> : null }					        
				      </Menu>			        			        				        
				    </Header>
				    <Content style={{
				                padding: '0 50px'
				            }}>
						{this.props.children}
				    </Content>
				    <Footer style={{
				                textAlign: 'center'
				            }}>
				      RS ©2017 Created by DTBelieve
				    </Footer>
 				 </Layout>
			</div>
        )
    }
}

function mapStateToProps(state) {
    return {
    	online:state.user.online,
    	user:state.user.user,
    }
}
module.exports =  connect(mapStateToProps)(App)

