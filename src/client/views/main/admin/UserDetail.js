import React,{ Component } from 'react'
import {connect} from 'react-redux'
import { Form, Input, Tooltip, Radio,Icon, Cascader, Select, Row, Col, Checkbox, Button} from 'antd'
import AvatarImg from '../../../components/AvatarImg'
import AvatarFile from '../../../components/AvatarFile'
import appConfig from '../../../../../config/app.config.js'
import moment from 'moment'
import defineHistory from '../../../history'
import user from '../../../actions/user'
import ui from '../../../actions/ui'

import './UserDetail.less'

const sizeMap = {
	"0" : "少于100人",
	"1" : "少于100人多于1000人",
	"2" : "多于1000人",
}
const FormItem = Form.Item
const RadioGroup = Radio.Group;
const uploadUrlLen = appConfig.upload.file.uploadUrl.length

class UserSetting extends Component{
  constructor(props){
    super(props)  
  }

  render(){
    const { getFieldDecorator } = this.props.form;
    let {info,role} = this.props

    //已经上传的简历和作品
    const resume = info && info.resume && info.resume.path && info.resume.path.map(function(path){
      return (
        <li><a href={path} target="_blank" >{path.substring(uploadUrlLen+1)}</a></li>
      )
    })

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
      <div className="UserDetail">
        {role === 0 ? 
        <Form>
          <h1>普通用户信息设置页</h1>
          <FormItem
            {...formItemLayout}
            label="账号"
          >
              <Input disabled value={info.person.account}/>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="姓名"
          >
              <Input disabled value={info.resume.name}/>
          </FormItem> 
          <FormItem
            {...formItemLayout}
            label="手机号码"
          >
              <Input disabled value={info.resume.phone}/>
          </FormItem>      
         <FormItem
            {...formItemLayout}
            label="邮箱"
          >
              <Input disabled value={info.resume.email} />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="心仪工作"
          >
              <Input disabled value={info.resume.job.name} />
          </FormItem>  
          <FormItem
            {...formItemLayout}
            label="个人头像"
          >
          	<img src={info.person.imgPath}  alt="用户头像" className="avatar" />
          </FormItem> 
          {info.resume.path.length !== 0 ? 
          <FormItem
            {...formItemLayout}
            label="已上传的文件"
          >
             <ol>{resume}</ol>                                       
          </FormItem> 
           : ''}
        </Form>
        : ''}      
      {role === 1 ? 
        <Form>
          <h1>企业用户信息设置页</h1>
          <FormItem
            {...formItemLayout}
            label="账号"
          >
              <Input disabled value={info.company.account}/>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="公司名字"
          >
              <Input disabled value={info.name} />
          </FormItem> 
          <FormItem
            {...formItemLayout}
            label="公司地址"
          >
              <Input disabled value={info.address}/>
          </FormItem>      
         <FormItem
            {...formItemLayout}
            label="公司规模"
          >
              <Input disabled value={sizeMap[info.size]}/>
          </FormItem>
      <FormItem
            {...formItemLayout}
            label="公司成立时间"
          >
              <Input type="date" value={moment(info.foundAt).format('YYYY-MM-DD')} disabled/>
          </FormItem>  
          <FormItem
            {...formItemLayout}
            label="企业头像"
          >
          	<img src={info.company.imgPath}  alt="用户头像" className="avatar" />
          </FormItem> 
        </Form>
        : ''}        
        {role === 2 ? 
          <Form>
            <h1>管理员信息设置页</h1>
            <FormItem
              {...formItemLayout}
              label="账号"
            >
                <Input disabled value={info.adminstrator.account}/>
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="名字"
            >
                <Input disabled value={info.name} />
            </FormItem> 
            <FormItem
              {...formItemLayout}
              label="手机号码"
            >
                <Input disabled value={info.phone} />
            </FormItem>   
          <FormItem
            {...formItemLayout}
            label="管理员头像"
          >
          	<img src={info.adminstrator.imgPath}  alt="用户头像" className="avatar" />
          </FormItem>              
          </Form>
        : ''}            
      </div>
    )
  }
}


function mapStateToProps(state,ownProps){
  let {role,id} = ownProps.params,info
  if(role === '0'){
    info = state.admin.people.filter((item) => {return item._id === id})

  }else if(role === '1'){
    info = state.admin.companys.filter((item) => {return item._id === id})
  }else{
    info = state.admin.admins.filter((item) => {return item._id === id})
  }

  return {
    id:id,
    info:info[0],
    role:Number(role),
  }
}


module.exports = connect(mapStateToProps)(Form.create()(UserSetting))
