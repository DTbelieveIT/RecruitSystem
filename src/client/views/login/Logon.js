import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import defineHistory from '../../history'
import { Link } from 'react-router'
import user from '../../actions/user'
import ui from '../../actions/ui'
import { Form, Input, Radio,DatePicker, InputNumber, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button } from 'antd';

import './Logon.less'

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

class Logon extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            confirmDirty: false,
            role: '0',
            size:'0',
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                user
                    .logon(values)
                    .then(data => {
                    	if(data.status === 200){
                    		defineHistory.push('/login')
                            ui.openNotification('logon success!')
                        }else{
                            if(data.result === 'account existed!'){
                                ui.openNotification('account existed!')
                            }
                        }
                    })
            }
        });
    }
    handleChange = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
            role: e.target.value,
        });
       	return e.target.value
    }
    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({
            confirmDirty: this.state.confirmDirty || !!value
        });
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
            form.validateFields(['confirm'], {
                force: true
            });
        }
        callback();
    }
    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: {
                    span: 24
                },
                sm: {
                    span: 6
                },
            },
            wrapperCol: {
                xs: {
                    span: 24
                },
                sm: {
                    span: 14
                },
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
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
        })(
            <Select className="icp-selector">
        <Option value="86">+86</Option>
      </Select>
        );
        return (
            <div className="logon-page">
            <Form onSubmit={this.handleSubmit}>
        <FormItem
            {...formItemLayout}
            label="账号"
            hasFeedback
            >
          {getFieldDecorator('account', {
                rules: [{
                    required: true,
                    message: 'Please input your account!',
                }],
            })(
                <Input />
            )}
        </FormItem>
        <FormItem
            {...formItemLayout}
            label="密码"
            hasFeedback
            >
          {getFieldDecorator('password', {
                rules: [{
                    required: true,
                    message: 'Please input your password!',
                }, {
                    validator: this.checkConfirm,
                }],
            })(
                <Input type="password" />
            )}
        </FormItem>
        <FormItem
            {...formItemLayout}
            label="再次确认密码"
            hasFeedback
            >
          {getFieldDecorator('confirm', {
                rules: [{
                    required: true,
                    message: 'Please confirm your password!',
                }, {
                    validator: this.checkPassword,
                }],
            })(
                <Input type="password" onBlur={this.handleConfirmBlur} />
            )}
        </FormItem>
        <FormItem
            {...formItemLayout}
            label="角色类型"
            >
          {getFieldDecorator('role', {
                initialValue: this.state.role,
                getValueFromEvent:this.handleChange             
            })(
                <RadioGroup>
              <Radio value="0">普通用户</Radio>
              <Radio value="1">企业用户</Radio>
              <Radio value="2">管理员用户</Radio>
            </RadioGroup>
            )}
        </FormItem>   
        {this.state.role === '0' ? (
        	<div>
        <FormItem
            {...formItemLayout}
            label="用户姓名"
            hasFeedback
            >
          {getFieldDecorator('p[name]', {
                rules: [{
                    required: true,
                    message: 'Please input your name!',
                }],
            })(
                <Input />
            )}
        </FormItem>
         <FormItem
            {...formItemLayout}
            label="手机号码"
            >
          {getFieldDecorator('p[phone]', {
                rules: [{
                    required: true,
                    message: 'Please input your phone number!'
                }],
            })(
                <Input addonBefore={prefixSelector} />
            )}
        </FormItem>
                <FormItem
          {...formItemLayout}
          label="用户邮箱"
          hasFeedback
        >
          {getFieldDecorator('p[email]', {
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
            label="现居地"
            >
          {getFieldDecorator('p[address]', {})(
                <input />
            )}
        </FormItem>
                <FormItem
            {...formItemLayout}
            label="想要从事的职业"
            >
          {getFieldDecorator('p[job]', {})(
                <input />
            )}
        </FormItem>
        </div>
        ) : null}  
        {this.state.role === '1' ? (
        	<div>
                <FormItem
            {...formItemLayout}
            label="公司名称"
            hasFeedback
            >
          {getFieldDecorator('c[name]', {
                rules: [{
                    required: true,
                    message: 'Please input your company name!',
                }],
            })(
                <Input />
            )}
        </FormItem>
        <FormItem
            {...formItemLayout}
            label="公司规模"
            >
          {getFieldDecorator('c[size]', {
                initialValue: this.state.size,           
            })(
                <RadioGroup>
              <Radio value="0">100人以下</Radio>
              <Radio value="1">1000人以下</Radio>
              <Radio value="2">1000人以上</Radio>
            </RadioGroup>
            )}
        </FormItem>        
        <FormItem
            {...formItemLayout}
            label="公司地址"
            >
          {getFieldDecorator('c[address]', {})(
                <input />
            )}
        </FormItem>
        <FormItem
            {...formItemLayout}
            label="公司成立时间"
            >
          {getFieldDecorator('c[foundAt]', {})(
                <DatePicker />
            )}
        </FormItem> 
        </div>       
        ): null}   
       {this.state.role === '2' ? (
       	<div>
                <FormItem
            {...formItemLayout}
            label="管理员姓名"
            hasFeedback
            >
          {getFieldDecorator('a[name]', {
                rules: [{
                    required: true,
                    message: 'Please input your adminstrator name!',
                }],
            })(
                <Input />
            )}
        </FormItem>
                <FormItem
            {...formItemLayout}
            label="手机号码"
            >
          {getFieldDecorator('a[phone]', {
                rules: [{
                    required: true,
                    message: 'Please input your phone number!'
                }],
            })(
                <Input addonBefore={prefixSelector} />
            )}
        </FormItem> 
        </div>       
       	) : null}
        <FormItem {...tailFormItemLayout} style={{
                marginBottom: 8
            }}>
          {getFieldDecorator('agreement', {
                valuePropName: 'checked',
            })(
                <Checkbox>I have read the <Link to="agreement">agreement</Link></Checkbox>
            )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" size="large">Register</Button>
        </FormItem>
      </Form>
        </div>
        );
    }
}



function mapStateToProps(state) {
    return {

    }
}

module.exports = connect(mapStateToProps)(Form.create()(Logon))