import React,{ Component , PropTypes} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import defineHistory from '../../../history'
import _ from 'underscore'
import moment from 'moment'
import { Card,Button } from 'antd'
import recruitment from '../../../actions/recruitment'
import {ls} from '../../../util/util'

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
  		if(item.user === this.props.user._id){
  			return true
  		}
  		return false
  	})
    return (
	  <div>
	    <Card title={`${job.name}(${company.address})`} bordered={false} style={{ width: '100%',height:550 }}>
		    <p>公司:{company.name}</p>
		    <p>公司规模:{company.size === '0' ? '少于100人':(company.size === '1' ? '少于100人多于1000人' : '多于1000人' )}</p>
		    <p>公司成立时间:{moment(company.foundAt).format('YYYY-MM-DD')}</p>
		    <p>招聘人数:{recruitNum}</p>
		    <p>已投人数:{person.length}</p>
		    <p>薪酬:{salary}</p>
		    <p>学历要求:{educationRequire===0?'不限':(educationRequire===1?'专科':'本科或本科以上')}</p>	      
		    <p>工作内容及要求:{detail}</p>
		    <p>创建时间:{moment(meta.createAt).format('YYYY-MM-DD')}</p>
		    <img src={company.company.imgPath} alt="" style={{  width: 150,height: 150}} />
		    {
		    	this.props.user&&this.props.user.role===0 ? (<div>
		        	<Button type="default" onClick={()=>{defineHistory.push(`/chat/${company.company._id}`)}}>发起聊天</Button>
		    		{ existed ? <Button disabled>已投递</Button> : <Button type="primary" onClick={this.handleClick}>投个简历</Button>}
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