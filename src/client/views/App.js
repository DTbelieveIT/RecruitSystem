import React , { Component } from 'react'
import { Layout, Menu ,Icon} from 'antd'
import { connect } from 'react-redux'
import {Link} from 'react-router'
import defineHistory from '../history'
import Notification from '../components/Notification'
import MDropdown from '../components/Dropdown'
import user from '../actions/user'

import './App.less'

const {Header, Content, Footer,Sider} = Layout;

class App extends Component {
	constructor(props){
		super(props)
		this.state={
            value: "recruitmentList",
            collapsed: false,
        }
	}

	toggle = () => {
	    this.setState({
      		collapsed: !this.state.collapsed,
    	});
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
			        <Sider
			          trigger={null}
			          collapsible
			          collapsed={this.state.collapsed}
			        >
		                <div className={this.state.collapsed ? 'logo logo-short' : 'logo logo-long'} />	          
			          <Menu theme="dark" mode="inline" defaultSelectedKeys={['recruitmentList']}>
					        <Menu.Item key="recruitmentList">
	 							<Link to="/main/recruitmentList">
					        		<Icon type="home" />
	                            	<span className="nav-text">招聘信息列表</span>
	                        	</Link>
					        </Menu.Item>				            
					        <Menu.Item key="resume">
	 							<Link to="/">
					        		<Icon type="user" />
	                            	<span className="nav-text">简历管理</span>
	                        	</Link>
					        </Menu.Item>
					        <Menu.Item key="recruitment">
	 							<Link to="/">
					        		<Icon type="contacts" />
	                            	<span className="nav-text">招聘管理</span>
	                        	</Link>
					        </Menu.Item>
					        <Menu.Item key="addRecruitment">
	 							<Link to="/main/addRecruitment">
					        		<Icon type="usergroup-add" />
	                            	<span className="nav-text">添加招聘信息</span>
	                        	</Link>
					        </Menu.Item>
			          </Menu>
			        </Sider>				
					<Notification />
					<Layout>
					    <Header style={{ background: '#fff', padding: 0 }}>
					      <Menu
					            theme="dark"
					            mode="horizontal"
					            style={{
					                lineHeight: '64px'
					            }}
					            >
					        <Menu.Item key="trigger">
					            <Icon
					              className="trigger"
					              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
					              onClick={this.toggle}
					            />					    
					        </Menu.Item>	
					        <Menu.Item key="msg">
	 							<Link to="msg">
	 								<Icon type="message" />
	                            	<span className="nav-text">消息</span>
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
					    <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
							{this.props.children}
					    </Content>
					    <Footer style={{
					                textAlign: 'center'
					            }}>
					      RS ©2017 Created by DTBelieve
					    </Footer>
				    </Layout>
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

