import React,{Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import Button from '../components/Button'
import EditText from '../components/EditText'
import {RSAEncrypt} from '../util'
import {LOGIN,ACCOUNT,PASSWORD,CLEAR} from '../constants/Const'
import {updateEditText,fetchDataIfNeed} from '../actions'
require('../style/Login.less')

class Login extends Component{
	constructor(props){
		super(props)
	}

	componentDidMount(){
		if(localStorage.getItem('account') !== null){
			this.props.dispatch(updateEditText(localStorage.getItem('account'),0))
		}
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.status === 1){
			if(nextProps.data.code === 200){
				alert('login success')		
				browserHistory.replace('/')
			}else{
				alert('login fail')
			}
		}
	}

	handleChange(child,id,value){
		let kind = LOGIN
		switch(id){
			case 'account':
				kind += ACCOUNT;
				break;
			case 'password':
				kind += PASSWORD;
				break;
		}
		let parent = child._reactInternalInstance._currentElement._owner._instance
		parent.props.dispatch(updateEditText(value,kind))
		console.log('handleChange')
	}

	logon(){
		browserHistory.push('/logon')
	}

	login(){
		console.log('submit')
        let dispatch = this._reactInternalInstance._currentElement._owner._instance.props.dispatch
        dispatch = dispatch === undefined ? this.props.dispatch : dispatch
        let account = document.querySelector('#account').firstChild.value
        let password = document.querySelector('#password').firstChild.value
        if(account.trim().length > 0 && password.trim().length > 0){
        	password = RSAEncrypt(password)
        	dispatch(updateEditText(password,1))
        	localStorage.setItem('account',account)
        	dispatch(fetchDataIfNeed({
        		method:'POST',
        		path:'/login',
        		category:LOGIN,
        		query:{
        			account:account,
        			password:password
        		}
        	}))
        }else if(account.trim().length === 0){
        	alert('账号不能为空！')
        }else if(password.trim().length === 0){
        	alert('密码不能为空！')
        }
	}

	handleKeyDown(e){
		if(e.keyCode === 13){
			console.log('keyboard submit')
			this.login()
		}
	}

	componentWillUnmount(){
		this.props.dispatch({type:CLEAR})
	}

	render(){
		return (
			<div>
				<h1>登录页</h1>
				<div onKeyDown={this.handleKeyDown.bind(this)}>
                	<EditText margin='.2rem 0 0 0' value={this.props.account} onChange={this.handleChange} id="account" type="text" placeholder="输入你的账号" name="account" />
                	<EditText margin='.2rem 0 0 0' value={this.props.password} onChange={this.handleChange} id="password" type="password" placeholder="输入你的密码" name="password" />
                	<div style={{
                		paddingTop:'1rem'
                	}}>
                	</div>
                	<Button onClick={this.login} id='login' width='100%' height='4rem' radius='.5rem' margin='2% auto 2% auto' fontSize='1.8rem' text=' 登 录 '/>
                    <div className='feedback'>
                        <span onClick={this.logon.bind(this)} id='logon'>注册新账号</span>
                    </div>	
				</div>
			</div>

		)
	}
}

Login.PropTypes = {
	status:PropTypes.number,
	data:PropTypes.object.isRequired,
	account:PropTypes.string.isRequired,
	password:PropTypes.string.isRequired,
}

Login.defaultProps = {
	status:-3,
	data:{},
	account:'',
	password:'',
}

function mapStateToProps(state){
	return {
		status:state.loginReducer.status,
		data:state.loginReducer.data,
		account:state.loginReducer.account,
		password:state.loginReducer.password,
	}
}

module.exports = connect(mapStateToProps)(Login)