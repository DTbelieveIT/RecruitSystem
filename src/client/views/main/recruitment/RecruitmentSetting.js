import React,{ Component } from 'react'
import {connect} from 'react-redux'
import { Form, Input, Radio,Icon, Button} from 'antd'
import defineHistory from '../../../history'
import user from '../../../actions/user'
import recruitment from '../../../actions/recruitment'
import appConfig from '../../../../../config/app.config'

const FormItem = Form.Item
const RadioGroup = Radio.Group;
const uploadUrlLen = appConfig.upload.file.uploadUrl.length

class RecruitmentManage extends Component{
	constructor(props){
		super(props)
		this.state = {
			user:{
				person:{},
				resume:{
					job:{},
					path:[]
				},
			},
			status:0,
		}
	}
	  handleSubmit = (e) => {
	    e.preventDefault();
	    this.props.form.validateFieldsAndScroll((err, values) => {
	      if (!err) {
	        console.log('Received values of form: ', values);
	        recruitment.updateStatus(values)
	      }
	    })
	  }

	handleBack = () => {
		defineHistory.goBack()
	}

    handleChange = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
            status: e.target.value,
        });
       	return e.target.value
    }

    componentDidMount(){
    	user
    	.getUserInfo(this.props.uid)
    	.then(result => {
    		this.setState({
    			user:result.info
    		})
    	})
    }

  render(){
    const {getFieldDecorator} = this.props.form;  	
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    }

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
    }
    const {user} = this.state
    const {rid,uid,cid,status} = this.props

    //已经上传的简历和作品
    const resume = user && user.resume && user.resume.path && user.resume.path.map(function(path){
      return (
        <li><a href={path} target="_blank" >{path.substring(uploadUrlLen+1)}</a></li>
      )
    })

    return (
		<Form onSubmit={this.handleSubmit}>
          <h1>用户招聘状态设置页</h1>
          <FormItem
            {...formItemLayout}
            label="账号"
          >
              <Input value={user.person.account} disabled/>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label='姓名'
          >
            <Input value={user.resume.name}  disabled />
          </FormItem> 
          <FormItem
            {...formItemLayout}
            label="手机号码"
          >
              <Input value={user.resume.phone} disabled />
          </FormItem>      
         <FormItem
            {...formItemLayout}
            label="邮箱"
          >
              <Input value={user.resume.email} disabled />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="心仪工作"
          >
              <Input value={user.resume.job.name} disabled />
          </FormItem>  
          <FormItem
            {...formItemLayout}
            label="简历与作品"
          >
          	{user.resume.path.length !== 0 ? 
             <ol>{resume}</ol>                                       
           	: '无上传'}
          </FormItem> 
          {getFieldDecorator('cid', {
                initialValue: cid,       
            })(
            	<Input type="hidden" />
            )}
          {getFieldDecorator('uid', {
                initialValue: uid,       
            })(
            	<Input type="hidden" />
            )}
          {getFieldDecorator('rid', {
                initialValue: rid,       
            })(
            	<Input type="hidden" />
            )}
        <FormItem
            {...formItemLayout}
            label="修改面试者状态"
            >
          {getFieldDecorator('status', {
                initialValue: status,
                getValueFromEvent:this.handleChange             
            })(
              <RadioGroup>
	              <Radio value={0}>待处理</Radio>
	              <Radio value={1}>拒绝</Radio>
	              <Radio value={2}>邀请面试</Radio>
	              <Radio value={3}>面试失败</Radio>
	              <Radio value={4}>面试成功</Radio>
            </RadioGroup>
            )}
        </FormItem>          
          <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" size="large">确定</Button>{'  '}
            <Button type="default" size="large" onClick={this.handleBack}>返回</Button>
          </FormItem>
        </Form>      
    )
  }
}


function mapStateToProps(state,ownProps){	
	let {uid,rid} = ownProps.params
	let infos = state.recruitment.infos
	let targetInfo = null,targetPerson = null
	targetInfo = infos.find((item) => {
		return item._id === rid
	})
	targetPerson = targetInfo.person.find((item) => {
		return item.user === uid
	})

	return {
		uid:uid,
		rid:rid,
		cid:state.user.user._id,
		status:targetPerson.status || 0,
	}
}

module.exports = connect(mapStateToProps)(Form.create()(RecruitmentManage))
