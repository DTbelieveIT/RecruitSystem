import React,{ Component , PropTypes} from 'react'
import {connect} from 'react-redux'
import {fetchDataIfNeed} from '../actions'
import {UPDATEINFO,CLEAR} from '../constants/Const'
import defineHistory from '../history'
import Avatar from '../components/Avatar'
import moment from 'moment'
import { Upload,Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button ,message} from 'antd'
import '../style/Avatar.less'
import VSetting from '../virtual_data/Setting'

const FormItem = Form.Item;

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg';
  if (!isJPG) {
    message.error('You can only upload JPG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJPG && isLt2M;
}


class UpdateInfoForm extends React.Component {
	constructor(props){
		super(props)
	  	this.state = {
	    	confirmDirty: false,
	    	changePassword:false,
        imageUrl:props.user.imgPath
	  	};
	}

  handleChange = (info) => {
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => this.setState({ imageUrl }));
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
      	console.log('发送请求');
      	this.props.dispatch(fetchDataIfNeed({
      		method:'POST',
      		path:'/updateInfo',
      		category:UPDATEINFO,
      		query:values
      	}))
        console.log('Received values of form: ', values);
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
		if(nextProps.updateStatus === 1){
			if(nextProps.data.code === 200){
				alert('updateInfo success')		
				defineHistory.replace('/')
			}else{
				alert('updateInfo fail')
			}
		}
	}

	componentWillUnmount(){
		this.props.dispatch({type:UPDATEINFO + CLEAR})
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
            {getFieldDecorator('resume["phone"]', {
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
            {getFieldDecorator('resume["email"]', {
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
            {getFieldDecorator('resume["job"]["name"]', {
              initialValue:this.props.person.resume.job.name
            })(
              <Input/>
            )}
          </FormItem>  
          <FormItem
            {...formItemLayout}
            label="更改个人头像"
          >
            {getFieldDecorator('file', {
              valuePropName: 'file',
              getValueFromEvent: this.normFile,
            })(
            <Upload
              className="avatar-uploader"
              name="avatar"
              showUploadList={false}
              action="/file/upload"
              beforeUpload={beforeUpload}
              onChange={this.handleChange}
            >
              {
                imageUrl === '/default.png' ?
                  <img src='/default.png' alt="" className="avatar" /> :
                  <img src={imageUrl} alt="" className="avatar" />
              }
            </Upload>
            )}
          </FormItem>                               
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
              initialValue:this.props.company.name,
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
              initialValue:this.props.company.address,
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
              initialValue:this.props.company.size
            })(
              <Input type="number"/>
            )}
          </FormItem>
      <FormItem
            {...formItemLayout}
            label="公司成立时间"
          >
            {getFieldDecorator('foundAt', {
              initialValue:moment(this.props.company.foundAt).format('YYYY-MM-DD')
            })(
              <Input type="date"/>
            )}
          </FormItem>         
          <FormItem
            {...formItemLayout}
            label="更改企业头像"
          >
            {getFieldDecorator('file', {
              valuePropName: 'file',
              getValueFromEvent: this.normFile,
            })(
            <Upload
              className="avatar-uploader"
              name="avatar"
              showUploadList={false}
              action="/file/upload"
              beforeUpload={beforeUpload}
              onChange={this.handleChange}
            >
              {
                imageUrl === '/default.png' ?
                  <img src='/default.png' alt="" className="avatar" /> :
                  <img src={imageUrl} alt="" className="avatar" />
              }
            </Upload>
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
                initialValue:this.props.adminstrator.name,
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
                initialValue:this.props.adminstrator.phone,
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

UpdateInfoForm.PropTypes = {
	updateStatus:PropTypes.number,
	data:PropTypes.object.isRequired,
	user:PropTypes.object.isRequired,
	person:PropTypes.object.isRequired,
	company:PropTypes.object.isRequired,
	adminstrator:PropTypes.object.isRequired,
}

UpdateInfoForm.defaultProps = {
	updateStatus:-3,
	data:{},
	user:{},
	person:{},
	company:{},
	adminstrator:{},
  role:-1,
}

function mapStateToProps(state){
  // state.loginReducer = VSetting
	return {
		user:state.loginReducer.data.user || {},
		person:state.loginReducer.data.info || {resume:{job:{}}},
		company:state.loginReducer.data.info || {},
		adminstrator:state.loginReducer.data.info || {},
		updateStatus:state.loginReducer.updateStatus,
    data:state.loginReducer.data,
    role:state.loginReducer.data.user.role
	}
}

module.exports = connect(mapStateToProps)(Form.create()(UpdateInfoForm))