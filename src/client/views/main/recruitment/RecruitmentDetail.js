import React,{ Component , PropTypes} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import defineHistory from '../../../history'
import _ from 'underscore'
import moment from 'moment'
import { Card,Button } from 'antd'
import VRecruitmentDetail from '../../../virtual_data/RecruitmentDetail'
   
class RecruitmentDetail extends React.Component {
	constructor(props){
		super(props)
	}

  handleClick = (e) => {
    e.preventDefault()
    console.log(this.props.id)
    console.log(this.props.user.id)
    console.log('投递简历')
  }

  render() {
  	const {company,job,person,detail,recruitNum,salary,educationRequire,meta} = this.props.info
    return (
	  <div style={{ background: '#ECECEC', padding: '30px' }}>
	    <Card title={`${job.name}(${company.address})`} bordered={false} style={{ width: '100%',height:550 }}>
		    <p>公司:{company.name}</p>
		    <p>公司规模:{company.size}</p>
		    <p>公司成立时间:{moment(company.foundAt).format('YYYY-MM-DD')}</p>
		    <p>招聘人数:{recruitNum}</p>
		    <p>已投人数:{person.length}</p>
		    <p>薪酬:{salary}</p>
		    <p>学历要求:{educationRequire===0?'不限':(educationRequire===1?'专科':'本科或本科以上')}</p>	      
		    <p>工作内容及要求:{detail}</p>
		    <p>创建时间:{moment(meta.createAt).format('YYYY-MM-DD')}</p>
		    <img src={company.company.imgPath} alt="" style={{  width: 150,height: 150}} />
		    <div>
		        <Button type="default" onClick={()=>{defineHistory.push(`/chat/${company.company._id}/${company.company.account}`)}}>发起聊天</Button>
		    </div>
		    {
		    	this.props.user&&this.props.user.role===0 ? (<div>
		    		<Button type="primary" onClick={this.handleClick}>投个简历</Button>{' '}
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
	return {
		info:info[0],
		user:state.user.user,
		id:id
	}
}

module.exports = connect(mapStateToProps)(RecruitmentDetail)