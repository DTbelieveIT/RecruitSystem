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
import recruitment from '../actions/recruitment'
import moment from 'moment'
import {ls} from '../util/util'

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
		if(type === 'chat'){
			this.setState({visible1:false})
			this.props.router.push(`/chat/${data.from._id}`)
		}
		if(type === 'linkman'){
			this.setState({visible2:false})
			this.props.router.push(`/chat/${data._id}`)			
		}
		if(type === 'resume'){
			console.log(data)
			this.setState({visible1:false})
			this.props.router.push(this.props.user.role === 0 ? `/delivery/${this.props.user._id}/${data.recruitment}` : `/recruitment/${data.from._id}/${data.recruitment}`)
		}
	}

	componentDidMount(){
		// try auto login
        const token = ls.getItem('token');
        const userid = ls.getItem('userid');
        if (token && token !== '') {
            user
            .reConnect(token)
            .then(result => {
                if (result.status === 200) {
                    user.online()
                    //获取未读消息
                    mymessage.getUnreadMessage({userid})  

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
        	console.log('收到一条新的消息')
            //获取未读消息
            mymessage.getUnreadMessage({userid})   

            //获取所有联系人信息
            mymessage.getLinkmans({userid}) 	           	

            //获取所有的招聘信息
            recruitment.queryRecruitmentList()
        })
	}

    render() {	
    	const messages = this.props.msgList
    	// 聊天消息
    	let ChatMsg = messages.filter(isChatMsg)
    	let ChatContent = <ul>
    		{ChatMsg.map((msg,key) => 
    			<li key={key} onClick={this.hide} >
					<a onClick={()=>this.onEnter(msg,'chat')} >
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
					<a onClick={()=>this.onEnter(msg,'resume')} >
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
					        {this.props.user.role === 0 ? 
						        <Menu.Item key="resume">
		 							<Link to={"/delivery/"+this.props.user._id}>
						        		<Icon type="user" />
		                            	<span className="nav-text">投递箱</span>
		                        	</Link>
						        </Menu.Item>
					        : null}	
					        {this.props.user.role === 1 ? 	            
					        <Menu.Item key="addRecruitment">
	 							<Link to="/main/addRecruitment">
					        		<Icon type="usergroup-add" />
	                            	<span className="nav-text">添加招聘信息</span>
	                        	</Link>
					        </Menu.Item>
					        : null}
					        {this.props.user.role === 1 ? 
						        <Menu.Item key="recruitment">
		 							<Link to={'/recruitment/' + this.props.info._id}>
						        		<Icon type="contacts" />
		                            	<span className="nav-text">招聘管理</span>
		                        	</Link>
						        </Menu.Item>
					        : null}	
					        {this.props.user.role === 2 ? 
						        <Menu.Item key="userAdmin">
		 							<Link to={'/admin/user'}>
						        		<Icon type="api" />
		                            	<span className="nav-text">用户信息管理</span>
		                        	</Link>
						        </Menu.Item>
					        : null}	
					        {this.props.user.role === 2 ? 
						        <Menu.Item key="recruitmentAdmin">
		 							<Link to={'/admin/recruitment'}>
						        		<Icon type="global" />
		                            	<span className="nav-text">招聘信息管理</span>
		                        	</Link>
						        </Menu.Item>
					        : null}						        					        
			          </Menu>
			        </Sider>				
					<Notification />
					<Layout>
					    <Header style={{ background: '#fff', padding: 0 }}>
					      <Menu
					            theme="dark"
					            mode="horizontal"
					            style={{
					                lineHeight: '64px',
					                position:'relative',
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
					        <Menu.Item key="login" style={{position:'absolute',right:90}}>
	 							<Link to="login">
	                            	<span className="nav-text">登录</span>
	                        	</Link>
					        </Menu.Item>}
					        {this.props.online ? null :
					        <Menu.Item key="logon" style={{position:'absolute',right:20}}>
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
    	user:state.user.user || {},
    	info:state.user.info || {},
    	linkmans:state.message.linkmans || [],
    	msgList:state.message.msgList || [],
    }
}
module.exports =  connect(mapStateToProps)(App)

