import React,{Component,PropTypes} from 'react'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import Button from '../components/Button'
import Radio from '../components/Radio'
import EditText from '../components/EditText'
import {RSAEncrypt} from '../util'
import {LOGON,ACCOUNT,PASSWORD,PASSWORD_CONFIRM,NAME,PHONE,CLEAR} from '../constants/Const'
import {updateEditText,fetchDataIfNeed} from '../actions'


class Logon extends Component{
	constructor(props){
		super(props)
		this.state = {
			radioOption:[
                {
                    text:'个人用户',
                    value: '0',
                    name: 'role',
                    checked: true
                },
                {
                    text:'企业用户',
                    value: '1',
                    name: 'role',
                    checked: false
                },
                {
                    text:'管理员',
                    value: '2',
                    name: 'role',
                    checked: false
                },
            ],
            display:{
            	role0:'none',
            	role1:'none',
            	role2:'none',
            	block:false	
            }
		}
	}

	handleChangeRadio(index){
        const _radioOption = this.state.radioOption;

        for(let r=0; r < _radioOption.length; r++){
            _radioOption[r].checked = false
        }

        _radioOption[index].checked = true;
        this.setState({radioOption: _radioOption})
    }

	handleChange(child,id,value){
		let kind = LOGON
		switch(id){
			case 'account':
				kind += ACCOUNT
				break
			case 'password':
				kind += PASSWORD
				break
			case 'cpassword':
				kind += PASSWORD_CONFIRM
				break
			case 'name':
				kind += NAME
				break
			case 'phone':
				kind += PHONE
				break
		}
		let parent = child._reactInternalInstance._currentElement._owner._instance
		parent.props.dispatch(updateEditText(value,kind))
	}

	checkInput(account,pwd,cpwd){
		if(account.trim().length > 0 && pwd.trim().length > 0 && cpwd.trim().length > 0){
			if(pwd.trim().length > 0 && pwd !== cpwd) return false
		}else if(account.trim().length === 0){
			alert('注册账号不能为空！')
			return false
		}else if(pwd.trim().length === 0 || cpwd.trim().length === 0){
			alert('密码不能为空')
			return false
		}
		return true
	}

	fillInfo(){
		console.log('fill infomation')
		let account = document.querySelector('#account').firstChild.value
        let password = document.querySelector('#password').firstChild.value
        let cpassword = document.querySelector('#cpassword').firstChild.value
        let role = document.querySelectorAll('#role input[type=radio]:checked')[0].value
        console.log(role)
        if(this.checkInput(account,password,cpassword)){
        	let roleStatus = {
        		role0:'none',
        		role1:'none',
        		role2:'none',
        		block:false
        	}
        	roleStatus['role'+role] = 'block'
        	roleStatus['block'] = true
        	this.setState({display:roleStatus})
        }else{
        	alert('请检查格式')
        }
	}

	logon(){
		console.log('logon')
		let account = document.querySelector('#account').firstChild.value
        let password = document.querySelector('#password').firstChild.value
        let cpassword = document.querySelector('#cpassword').firstChild.value
        let role = document.querySelectorAll('#role input[type=radio]:checked')[0].value
        let name = document.querySelector('#name').firstChild.value
        let phone = document.querySelector('#phone').firstChild.value
		let dispatch = this._reactInternalInstance._currentElement._owner._instance.props.dispatch
		dispatch = dispatch === undefined ? this.props.dispatch : dispatch
    	console.log('start logon')
    	dispatch(fetchDataIfNeed({
    		method:'POST',
    		path:'/logon',
    		category:LOGON,
    		query:{
    			account,
    			password:RSAEncrypt(password),
    			role,
    			name,
    			phone,
    		}
    	}))
	}

	handleKeyDown(e){
		if(e.keyCode === 13){
			console.log('keyboard submit')
			this.logon()
		}
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.status === 1 && nextProps.data!==undefined){
			if(nextProps.data.code === 200){
				alert('logon success')		
				browserHistory.replace('/login')
			}else{
				alert('logon fail')
			}
		}
	}

	componentWillUnmount(){
		this.props.dispatch({type:CLEAR})
	}

	render(){
		return (
			<div>
				<h1>注册页</h1>
				<div onKeyDown={this.handleKeyDown.bind(this)}>
					<EditText margin=".2rem 0 0 0" value={this.props.account} id="account" type="text" onChange={this.handleChange} placeholder="输入你的账号" name="account"/>
					<EditText margin=".2rem 0 0 0" value={this.props.password} id="password" type="password" onChange={this.handleChange} placeholder="输入你的密码" name="password"/>
					<EditText margin=".2rem 0 0 0" value={this.props.cpassword} id="cpassword" type="password" onChange={this.handleChange} placeholder="再次输入你的密码" name="cpassword"/>
					<Radio options={this.state.radioOption} onChange={this.handleChangeRadio.bind(this)} id="role"/>
					<div style={{display:this.state.display.role0}}>
						个人用户
					</div>
					<div style={{display:this.state.display.role1}}>
						企业用户的注册资料
					</div>
					<div style={{display:this.state.display.role2}}>
						管理员
						<EditText margin=".2rem 0 0 0" value={this.props.name} id="name" type="text" onChange={this.handleChange} placeholder="管理员姓名" name="name"/>
						<EditText margin=".2rem 0 0 0" value={this.props.phone} id="phone" type="number" onChange={this.handleChange} placeholder="管理员手机号码" name="phone"/>
					</div>
					{this.state.display.block?<Button  onClick={this.logon.bind(this)} id='logon' width='100%' height='4rem' radius='.5rem' margin='2% auto 2% auto' fontSize='1.8rem' text=' 注 册 '/>:<Button  onClick={this.fillInfo.bind(this)} id='next' width='100%' height='4rem' radius='.5rem' margin='2% auto 2% auto' fontSize='1.8rem' text=' 下一步 '/>}
				</div>
			</div>
		)
	}
}

Logon.PropTypes = {
	status:PropTypes.number.isRequired,
	data:PropTypes.object.isRequired,
	account:PropTypes.string.isRequired,
	password:PropTypes.string.isRequired,
	cpassword:PropTypes.string.isRequired,
	name:PropTypes.string.isRequired,
	phone:PropTypes.number.isRequired,
}

Logon.defaultProps = {
	status:-3,
	data:{}
}

function mapStateToProps(state){
	return {
		status:state.logonReducer.status,
		data:state.logonReducer.data,
		account:state.logonReducer.account,
		password:state.logonReducer.password,
		cpassword:state.logonReducer.cpassword,
		name:state.logonReducer.name,
		phone:state.logonReducer.phone,
	}
}

module.exports = connect(mapStateToProps)(Logon)