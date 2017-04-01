import React,{Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import Button from './Button'
import EditText from './EditText'
import {LOGIN,ACCOUNT,PASSWORD} from '../constants/Const'
import {updateEditText} from '../actions'

class Login extends Component{
	constructor(props){
		super(props)
	}

	componentDidMount(){
		let account = document.getElementById('account')
		if(localStorage.getItem('account') !== null){
			this.props.dispatch(updateEditText(localStroage.getItem('account'),0))
		}
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.status === 1){
			console.log('nextProps change')
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

	login(){
		console.log('submit')
	}

	handleKeyDown(e){
		if(e.keyCode === 13){
			console.log('keyboard submit')
			this.login()
		}
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