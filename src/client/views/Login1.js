import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import defineHistory from '../history'
import { Link } from 'react-router'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import user from '../actions/user'

import './Login1.less'

const FormItem = Form.Item;

class Login extends Component {
    constructor(props) {
        super(props)
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                user
                    .login(values)
                    .then(data => {
                        console.log(data)
                        if(data.status){
                            defineHistory.push('/')
                        }
                    })

            }
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div className="login-page">
              <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                  {getFieldDecorator('account', {
                        rules: [{
                            required: true,
                            message: 'Please input your account!'
                        }],
                    })(
                        <Input prefix={<Icon type="user" style={{
                            fontSize: 13
                        }} />} placeholder="请输入账号" />
                    )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('password', {
                        rules: [{
                            required: true,
                            message: 'Please input your password!'
                        }],
                    })(
                        <Input prefix={<Icon type="lock" style={{
                            fontSize: 13
                        }} />} type="password" placeholder="请输入密码" />
                    )}
                </FormItem>
                <FormItem>
                  <Button type="primary" htmlType="submit" className="login-form-button">
                    登录
                  </Button>
                  <Link to="/logon1">立即注册</Link>
                  <a className="login-form-forgot" href="">忘记密码</a>
                </FormItem>
              </Form>
         </div>
        )
    }
}


function mapStateToProps(state) {
    return {

    }
}

module.exports = connect(mapStateToProps)(Form.create()(Login))