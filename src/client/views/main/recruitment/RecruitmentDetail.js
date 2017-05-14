import React,{ Component , PropTypes} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import defineHistory from '../../../history'
import _ from 'underscore'
import moment from 'moment'
import { Card,Button } from 'antd'
import recruitment from '../../../actions/recruitment'
import {ls} from '../../../util/util'

import './RecruitmentDetail.less'

class RecruitmentDetail extends React.Component {
	constructor(props){
		super(props)
	}

  handleClick = (e) => {
    e.preventDefault()
    console.log('投递简历')
    recruitment.delivery({
    	recruitmentId:this.props.id,
    	userId:this.props.user._id,
    	companyId:this.props.info.company.company._id,
    	job:this.props.info.job.name,
    })
  }

  render() {
  	const {company,job,person,detail,recruitNum,salary,educationRequire,meta} = this.props.info
  	const existed = person.some((item) => {
  		if(item.user._id.toString() === this.props.user._id){
  			return true
  		}
  		return false
  	})
    return (
	  <div className="RecruitmentDetail"> 
	    <Card className="detail" title={`${job.name}(${company.address})`} bordered={false} >
		    <p><span>公司   :</span>{company.name}</p>
		    <p><span>公司规模   :</span>{company.size === '0' ? '少于100人':(company.size === '1' ? '少于100人多于1000人' : '多于1000人' )}</p>
		    <p><span>公司成立时间   :</span>{moment(company.foundAt).format('YYYY-MM-DD')}</p>
		    <p><span>招聘人数   :</span>{recruitNum}人</p>
		    <p><span>已投人数   :</span>{person.length}人</p>
		    <p><span>薪酬   :</span>{salary}元</p>
		    <p><span>学历要求   :</span>{educationRequire===0?'不限':(educationRequire===1?'专科':'本科或本科以上')}</p>	      
		    <p><span>工作内容及要求   :</span>{detail}</p>
		    <p><span>发布时间   :</span>{moment(meta.createAt).format('YYYY-MM-DD HH:mm:ss')}</p>
		    <img src={company.company.imgPath} alt="" style={{  width: 150,height: 150}} />
		    {
		    	this.props.user&&this.props.user.role===0 ? (<div className="btn">
		        	<Button type="default" size="large" className="btn_left" onClick={()=>{defineHistory.push(`/chat/${company.company._id}`)}}>发起聊天</Button>
		    		{ existed ? <Button size="large" disabled>已投递</Button> : <Button type="primary" size="large" onClick={this.handleClick}>投个简历</Button>}
		    	</div>): null
		    }
	    </Card>
	  </div>
    )
  }
}


function mapStateToProps(state,ownProps){
	let id = ownProps.params.id
	let info = _.filter(state.recruitment.infos || [],function(info){
		return info._id === id
	})
	if(state.user.user && info.length !== 0){
		ls.setItem('user',state.user.user)
		ls.setItem('rinfo',info)
	}
	return {
		info:info.length!==0&&info[0] || ls.getItem('rinfo')[0],
		user:state.user.user || ls.getItem('user'),
		id:id
	}
}

module.exports = connect(mapStateToProps)(RecruitmentDetail)