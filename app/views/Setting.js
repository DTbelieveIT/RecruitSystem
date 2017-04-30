import React,{ Component , PropTypes} from 'react'
import {connect} from 'react-redux'
import {fetchDataIfNeed} from '../actions'
import {SETTING,CLEAR} from '../constants/Const'
import defineHistory from '../history'
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button } from 'antd'
const FormItem = Form.Item;

class UpdateInfoForm extends React.Component {
	constructor(props){
		super(props)
	  	this.state = {
	    	confirmDirty: false,
	    	changePassword:false,
	  	};
	}

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
      	console.log('发送请求');
      	this.props.dispatch(fetchDataIfNeed({
      		method:'POST',
      		path:'/updateInfo',
      		category:SETTING,
      		query:values
      	}))
        console.log('Received values of form: ', values);
      }
    });
  }

  changePassword = () => {
  	this.state.changePassword = !this.state.changePassword
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }
  checkConfirm = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

	componentWillReceiveProps(nextProps){
		if(nextProps.status === 1){
			if(nextProps.data.code === 200){
				alert('updateInfo success')		
				defineHistory.replace('/')
			}else{
				alert('updateInfo fail')
			}
		}
	}

	componentWillUnmount(){
		this.props.dispatch({type:SETTING + CLEAR})
	}

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 14,
          offset: 6,
        },
      },
    };

    return (
      <Form onSubmit={this.handleSubmit}>
      	<h1>信息设置页</h1>
        <FormItem
          {...formItemLayout}
          label="账号"
        >
          {getFieldDecorator('account', {
          	initialValue:this.props.user.account
          })(
            <Input disabled/>
          )}
        </FormItem>
         <FormItem {...tailFormItemLayout} style={{ marginBottom: 8 }}>
          {getFieldDecorator('changePassword', {
          })(
            <Checkbox onClick={this.changePassword} ><a href="">修改密码</a></Checkbox>
          )}
        </FormItem>
        {this.state.changePassword ? (
	        <FormItem
	          {...formItemLayout}
	          label="Password"
	        >
	          {getFieldDecorator('password', {
	            rules: [{
	              required: true, message: 'Please input your password!',
	            }, {
	              validator: this.checkConfirm,
	            }],
	          })(
	            <Input type="password" />
	          )}
	        </FormItem>
	        ):''}
	    {this.state.changePassword ? (
	        <FormItem
	          {...formItemLayout}
	          label="Confirm Password"
	        >
	          {getFieldDecorator('confirm', {
	            rules: [{
	              required: true, message: 'Please confirm your password!',
	            }, {
	              validator: this.checkPassword,
	            }],
	          })(
	            <Input type="password" onBlur={this.handleConfirmBlur} />
	          )}
	        </FormItem>
	    ) : ''}
        <FormItem
          {...formItemLayout}
          label={(
            <span>
              姓名&nbsp;
              <Tooltip title="What do you want other to call you?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('name', {
          	initialValue:this.props.person.resume.name,
            rules: [{ whitespace: true }],
          })(
            <Input />
          )}
        </FormItem>	
        <FormItem
          {...formItemLayout}
          label="手机号码"
        >
          {getFieldDecorator('phone', {
          	initialValue:this.props.person.resume.phone,
            rules: [{ required: true, message: 'Please input your phone number!' }],
          })(
            <Input />
          )}
        </FormItem>      
       <FormItem
          {...formItemLayout}
          label="邮箱"
        >
          {getFieldDecorator('email', {
          	initialValue:this.props.person.resume.email,
            rules: [{
              type: 'email', message: 'The input is not valid E-mail!',
            }, {
              required: true, message: 'Please input your E-mail!',
            }],
          })(
            <Input />
          )}
        </FormItem>
 		<FormItem
          {...formItemLayout}
          label="心仪工作"
        >
          {getFieldDecorator('job', {
          	initialValue:this.props.person.resume.job.name
          })(
            <Input/>
          )}
        </FormItem>         
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" size="large">修改个人信息</Button>
        </FormItem>
      </Form>
    );
  }
}

UpdateInfoForm.PropTypes = {
	status:PropTypes.number,
	data:PropTypes.object.isRequired,
	user:PropTypes.object.isRequired,
	person:PropTypes.object.isRequired,
	company:PropTypes.object.isRequired,
	adminstrator:PropTypes.object.isRequired,
}

UpdateInfoForm.defaultProps = {
	status:-3,
	data:{},
	user:{},
	person:{},
	company:{},
	adminstrator:{}
}

function mapStateToProps(state){
	return {
		user:state.loginReducer.data.user || {},
		person:state.loginReducer.data.info || {resume:{job:{}}},
		company:state.loginReducer.data.info || {},
		adminstrator:state.loginReducer.data.info || {},
		status:state.settingReducer.status,
		data:state.settingReducer.data,
	}
}

module.exports = connect(mapStateToProps)(Form.create()(UpdateInfoForm))