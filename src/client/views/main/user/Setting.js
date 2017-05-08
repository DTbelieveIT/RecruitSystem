import React,{ Component , PropTypes} from 'react'
import { Form, Input, Tooltip, Radio,Icon, Cascader, Select, Row, Col, Checkbox, Button} from 'antd'
import moment from 'moment'
import {connect} from 'react-redux'
import defineHistory from '../../../history'
import AvatarImg from '../../../components/AvatarImg'
import AvatarFile from '../../../components/AvatarFile'
import appConfig from '../../../../../config/app.config.js'
import user from '../../../actions/user'
import ui from '../../../actions/ui'

const FormItem = Form.Item
const RadioGroup = Radio.Group;
const uploadUrlLen = appConfig.upload.file.uploadUrl.length

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
        console.log('Received values of form: ', values);
        user
        .updateInfo(values)
        .then(result => {
          if(result.status === 200){
              defineHistory.push('/main')
              ui.openNotification('updateInfo success')
          }
        })
      }
    });
  }

  normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.file;
  }

  normFileList = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
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

  render() {
    const { getFieldDecorator } = this.props.form;
    const imageUrl = this.state.imageUrl;
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

    //已经上传的简历和作品
    const resume = this.props.info && this.props.info.resume && this.props.info.resume.path && this.props.info.resume.path.map(function(path){
      return (
        <li><a href={path} target="_blank" >{path.substring(uploadUrlLen+1)}</a></li>
      )
    })

    return (
      <div>
      {this.props.role === 0 ? 
        <Form onSubmit={this.handleSubmit}>
          <h1>普通用户信息设置页</h1>
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
            {getFieldDecorator('resume["name"]', {
              initialValue:this.props.info.resume.name,
              rules: [{ whitespace: true }],
            })(
              <Input />
            )}
          </FormItem> 
          <FormItem
            {...formItemLayout}
            label="手机号码"
          >
            {getFieldDecorator('resume["phone"]', {
              initialValue:this.props.info.resume.phone,
              rules: [{ required: true, message: 'Please input your phone number!' }],
            })(
              <Input />
            )}
          </FormItem>      
         <FormItem
            {...formItemLayout}
            label="邮箱"
          >
            {getFieldDecorator('resume["email"]', {
              initialValue:this.props.info.resume.email,
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
            {getFieldDecorator('resume["job"]["name"]', {
              initialValue:this.props.info.resume.job.name
            })(
              <Input/>
            )}
          </FormItem>  
          <FormItem
            {...formItemLayout}
            label="更改个人头像"
          >
            {getFieldDecorator('img', {
              valuePropName: 'img',
              getValueFromEvent: this.normFile
            })(
              <AvatarImg imageUrl='/default.png' action="/file/upload" user={this.props.user} onChange={()=>{}} />
            )}
          </FormItem> 
          <FormItem
            {...formItemLayout}
            label="上传个人简历和作品"
          >
            {getFieldDecorator('files', {
              valuePropName: 'files',
              initialValue:[],
              getValueFromEvent: this.normFileList,
            })(
              <AvatarFile  action="/file/upload"  onChange={()=>{}} />
            )}
          </FormItem>  
          {this.props.info.resume.path.length !== 0 ? 
          <FormItem
            {...formItemLayout}
            label="已上传的文件"
          >
             <ol>{resume}</ol>                                       
          </FormItem> 
           : ''}
          <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" size="large">修改个人信息</Button>
          </FormItem>
        </Form>
        : ''}
        {this.props.role === 1 ? 
        <Form onSubmit={this.handleSubmit}>
          <h1>企业用户信息设置页</h1>
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
                公司名字&nbsp;
                <Tooltip title="What do you want other to call your company?">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            )}
          >
            {getFieldDecorator('name', {
              initialValue:this.props.info.name,
              rules: [{ whitespace: true }],
            })(
              <Input />
            )}
          </FormItem> 
          <FormItem
            {...formItemLayout}
            label="公司地址"
          >
            {getFieldDecorator('address', {
              initialValue:this.props.info.address,
              rules: [{ required: true, message: 'Please input your company address!' }],
            })(
              <Input />
            )}
          </FormItem>      
         <FormItem
            {...formItemLayout}
            label="公司规模"
          >
            {getFieldDecorator('size', {
              initialValue:this.props.info.size
            })(
              <RadioGroup>
                <Radio value="0">少于100人</Radio>
                <Radio value="1">少于100人多于1000人</Radio>
                <Radio value="2">多于1000人</Radio>
            </RadioGroup>
            )}
          </FormItem>
      <FormItem
            {...formItemLayout}
            label="公司成立时间"
          >
            {getFieldDecorator('foundAt', {
              initialValue:moment(this.props.info.foundAt).format('YYYY-MM-DD')
            })(
              <Input type="date"/>
            )}
          </FormItem>         
          <FormItem
            {...formItemLayout}
            label="更改企业头像"
          >
            {getFieldDecorator('img', {
              valuePropName: 'img',
              getValueFromEvent: this.normFile
            })(
              <AvatarImg imageUrl='/default.png' action="/file/upload" user={this.props.user} onChange={()=>{}} />
            )}
          </FormItem>           
          <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" size="large">修改企业信息</Button>
          </FormItem>
        </Form>
        : ''}
        {this.props.role === 2 ? 
          <Form onSubmit={this.handleSubmit}>
            <h1>管理员信息设置页</h1>
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
                  名字&nbsp;
                  <Tooltip title="What do you want other to call your company?">
                    <Icon type="question-circle-o" />
                  </Tooltip>
                </span>
              )}
            >
              {getFieldDecorator('name', {
                initialValue:this.props.info.name,
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
                initialValue:this.props.info.phone,
                rules: [{ required: true, message: 'Please input your phone number!' }],
              })(
                <Input />
              )}
            </FormItem>    
            <FormItem {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit" size="large">修改管理员信息</Button>
            </FormItem>
          </Form>
        : ''}        
      </div>
    );
  }
}

function mapStateToProps(state){
  let info,role = state.user.user.role
  if(role === 0){
    info = state.user.info || {resume:{path:[]}}
  }else if(role === 1){
    info = state.user.info || {}
  }else if(role === 2){
    info = state.user.info || {}
  }

	return {
		user:state.user.user,
    info:info,
    role:role,
	}
}

module.exports = connect(mapStateToProps)(Form.create()(UpdateInfoForm))