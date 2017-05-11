import React , { Component } from 'react'
import { Layout, Menu ,Icon,Tooltip,Tabs,Popover } from 'antd'
import { connect } from 'react-redux'
import {Link} from 'react-router'
import defineHistory from '../history'
import Notification from '../components/Notification'
import MDropdown from '../components/Dropdown'
import user from '../actions/user'
import socket from '../socket'
import mymessage from '../actions//message'
import moment from 'moment'

import './App.less'

const {Header, Content, Footer,Sider} = Layout;
const TabPane = Tabs.TabPane;

function isChatMsg(message,index,array){
	return message.msgType === 'chat'
}

function isResumeMsg(message,index,array){
	return message.msgType === 'resume'
}

class App extends Component {
	constructor(props){
		super(props)
		this.state={
            value: "recruitmentList",
            collapsed: false,
            visible1:false,
            visible2:false,
        }
	}

	handleChange = (key) => {
		// console.log(key)
	}

	toggle = () => {
	    this.setState({
      		collapsed: !this.state.collapsed,
    	});
	}


	handleVisible1Change = (visible) => {
		this.setState({visible1:visible})
	}

	handleVisible2Change = (visible) => {
		this.setState({visible2:visible})
	}

	onEnter = (data,type) => {
		//路由跳转
		if(type === 'msg'){
			this.setState({visible1:false})
			this.props.router.push(`/chat/${data.from._id}`)
		}
		if(type === 'linkman'){
			this.setState({visible2:false})
			this.props.router.push(`/chat/${data._id}`)			
		}
	}

	componentDidMount(){
		// try auto login
        const token = window.localStorage.getItem('token');
        const userid = window.localStorage.getItem('userid');
        if (token && token !== '') {
            user
            .reConnect(token)
            .then(result => {
                if (result.status === 200) {
                    user.online()
                    //获取未读消息
                    mymessage.getUnreadMessage({userid}).then()   

                    //获取所有联系人信息
                    mymessage.getLinkmans({userid}) 
                    if (this.props.location.pathname === '/') {
                    	defineHistory.push('/main')
                    }
                }
            });
        } 	

        //socket监听事件
        socket.on('connect',data=>{
        	console.log('socket'+socket.id+'连接成功')
        })

        socket.on('reconnect',()=>{
        	console.log('socket重连')
        	user
        	.reConnect(token)
            .then(result => {
                if (result.status === 200) {
                    user.online();
                    //获取未读消息
                    mymessage.getUnreadMessage({userid})   

                    //获取所有联系人信息
                    mymessage.getLinkmans({userid})                     
                    if (this.props.location.pathname === '/') {
                    	defineHistory.push('/main')
                    }
                }
            });
        })

        socket.on('disconnect',()=>{
        	console.log('socket断开连接,用户需要下线')
        	user.offline()
        })        

        socket.on('new message',data=>{
        	console.log('收到一条新消息')
            //获取未读消息
            mymessage.getUnreadMessage({userid})   

            //获取所有联系人信息
            mymessage.getLinkmans({userid}) 	           	
        })
	}

    render() {	
    	const messages = this.props.msgList
    	// 聊天消息
    	let ChatMsg = messages.filter(isChatMsg)
    	let ChatContent = <ul>
    		{ChatMsg.map((msg,key) => 
    			<li key={key} onClick={this.hide} >
					<a onClick={()=>this.onEnter(msg,'msg')} >
						<h3>{msg.from.account}</h3>
						<p>{msg.content}</p>
              			<span className="time">{moment(msg.meta.createAt).format('YYYY-MM-DD HH:mm:ss')}</span>				
					</a>
				</li>)
    		}
    	</ul>
    	//面试消息
    	let ResumeMsg = messages.filter(isResumeMsg)
    	let ResumeContent = <ul>
    		{ResumeMsg.map((msg,key) => 
    			<li key={key} onClick={this.hide}>
					<a onClick={()=>this.onEnter(msg,'msg')} >
						<h3>{msg.from.account}</h3>
						<p>{msg.content}</p>
              			<span className="time">{moment(msg.meta.createAt).format('YYYY-MM-DD HH:mm:ss')}</span>				
					</a>
				</li>)
    		}    		
    	</ul>
    	const unreadMsg = (
			<Tabs defaultActiveKey="1" onChange={this.handleChange}>
			    <TabPane tab="聊天消息" key="1" >
           			<div className="content">
                        {ChatMsg.length !== 0 ? ChatContent : '没有未读聊天信息'}
                    </div>
			    </TabPane>
			    <TabPane tab="面试消息" key="2" >
		 			<div className="content">
                        {ResumeMsg.length !== 0 ? ResumeContent : '没有未读面试信息'}
                    </div>
			    </TabPane>
			</Tabs>  
    	)	

    	let sessionMsg = this.props.linkmans
		const sessionContent = 
		  <div className="sessionContent">
			<ul>
		  	{
		  		sessionMsg.map((linkman,key) => 
	    			<li key={key} onClick={this.hide}>
						<a  onClick={()=>this.onEnter(linkman,'linkman')}>
							<h3>{linkman.account}</h3>
							<img src={linkman.imgPath} />
						</a>
					</li>		  			
		  		)
		  	}
			</ul>
		  </div>
		


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
					          <Popover content={unreadMsg} trigger="hover" visible={this.state.visible1} onVisibleChange={this.handleVisible1Change}>
					        	<div style={{position:'relative'}}>
 									<Icon type="message" />
                                    {this.props.msgList.length === 0 ? null : <span className="tip" >{`${this.props.msgList.length}条`}</span>}
                            		<span className="nav-text">消息</span>
					        	</div>
  							 </Popover>
					        </Menu.Item>	
					        <Menu.Item key="chat">
					          <Popover content={sessionContent} trigger="hover" visible={this.state.visible2} onVisibleChange={this.handleVisible2Change}>
 								<Icon type="link" />
                            	<span className="nav-text">会话</span>
  							 </Popover>
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
    	linkmans:state.message.linkmans || [],
    	msgList:state.message.msgList || [],
    }
}
module.exports =  connect(mapStateToProps)(App)

