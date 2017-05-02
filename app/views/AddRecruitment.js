import React,{ Component , PropTypes} from 'react'
import {connect} from 'react-redux'
import {fetchDataIfNeed} from '../actions'
import {ADDRECRUITMENT,QUERYJOBLIST,CLEAR} from '../constants/Const'
import defineHistory from '../history'
import moment from 'moment'
import { Form, Input,Radio, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button } from 'antd'
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class AddRecruitment extends React.Component {
	constructor(props){
		super(props)
    this.state = {
      value: -3
    }
	}

  onChange = (e) => {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
      	console.log('发送招聘信息添加请求');
      	this.props.dispatch(fetchDataIfNeed({
      		method:'POST',
      		path:'/addRecruitment',
      		category:ADDRECRUITMENT,
      		query:values
      	}))
        console.log('Received values of form: ', values);
      }
    });
  }

	componentWillReceiveProps(nextProps){
      if(nextProps.status === 1 && nextProps.data!==undefined){
        if(nextProps.data.code === 200){
          alert('addRecruitment success')    
          defineHistory.replace('/')
        }else{
          alert('addRecruitment fail')
        }
      }    
  }

  componentDidMount(){
      this.props.dispatch(fetchDataIfNeed({
          method:'GET',
          path:'/queryJobList',
          category:QUERYJOBLIST
      }))
  } 

  componentWillUnmount(){
    this.props.dispatch({type:ADDRECRUITMENT+CLEAR})
  }  

  render() {
    const { getFieldDecorator,getFieldProps } = this.props.form;
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

    const radioStyle = {
      // display: 'block',
      height: '30px',
      lineHeight: '30px',
    };

    return (
        <Form onSubmit={this.handleSubmit}>
          <h1>招聘信息添加页</h1>
          <FormItem>
            {getFieldDecorator('company', {
              initialValue:this.props.info._id
            })(
              <Input type="hidden"/>
            )}
          </FormItem>          
          <FormItem
            {...formItemLayout}
            label="公司"
          >
            {getFieldDecorator('name', {
              initialValue:this.props.info.name
            })(
              <Input disabled/>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="工作"
          >
            {getFieldDecorator('job',{
              initialValue:this.state.value,
              onChange:this.onChange,
              rules:[{ required: true, message: 'Please select the job you want!' }],
            })(
            <RadioGroup >
              {this.props.data.jobs.map((job)=>{
                return <Radio style={radioStyle} key={job._id} value={job._id}>{job.name}</Radio>          
              })}
              <Radio style={radioStyle} value={this.props.data.jobs.length}>
                More...
              </Radio>
            </RadioGroup>
              )}
          </FormItem>
          {this.state.value === this.props.data.jobs.length ? 
          <FormItem
            {...formItemLayout}
            label="你想要招聘职位"
          >
            {getFieldDecorator('newJob',{
              initialValue:'',
              rules: [{ required: true, message: 'Please input the job!' }],
            })(
                <Input />
              )}
          </FormItem>          
            : null}
          <FormItem
            {...formItemLayout}
            label="招聘人数"
          >
            {getFieldDecorator('recruitNum', {
              rules: [{ required: true, message: 'Please input your recruitNum!' }],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="薪水"
          >
            {getFieldDecorator('salary', {
              rules: [{ required: true, message: 'Please input your salary!' }],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="学历要求"
          >
          {getFieldDecorator('educationRequire',{
              initialValue:"0"
            })(
              <RadioGroup>
                <Radio value="0">学历不限</Radio>
                <Radio value="1">专科</Radio>
                <Radio value="2">本科或本科以上</Radio>          
              </RadioGroup>
            )}
          </FormItem>    
          <FormItem
            {...formItemLayout}
            label="工作内容及要求"
          >
            {getFieldDecorator('detail', {
              rules: [{ required: true, message: 'Please input detail!' }],
            })(
              <Input type="textarea" rows={4} />
            )}
          </FormItem>                
          <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" size="large">发布招聘信息</Button>
          </FormItem>
        </Form>
    );
  }
}

AddRecruitment.PropTypes = {
  info:PropTypes.object.isRequired,
  data:PropTypes.object,
  status:PropTypes.number
}

AddRecruitment.defaultProps = {
  info:{},
  status:-3
}

function mapStateToProps(state){
	return {
    info:state.loginReducer.data.info,
    data:state.jobReducer.data || {jobs:[]},
    status:state.recruitmentReducer.status
	}
}

module.exports = connect(mapStateToProps)(Form.create()(AddRecruitment))
