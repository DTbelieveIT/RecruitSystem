import React,{ Component , PropTypes} from 'react'
import { Link } from 'react-router';
import { Card } from 'antd'

export default function RecruitmentItem(props){
	const { _id, company, recruitNum, salary ,educationRequire ,job,person} = props.info
	return (
	  <Card title={`${job.name}(${company.address})`} extra={<Link to={{pathname:`/detail/${_id}`}}>查看详情</Link>}  bordered={true}>
	    <p>公司:{company.name}</p>
	    <p>招聘人数:{recruitNum}</p>
	    <p>已投人数:{person.length}</p>
	    <p>薪酬:{salary}</p>
	    <p>学历要求:{educationRequire===0?'不限':(educationRequire===1?'专科':'本科或本科以上')}</p>

	  </Card>
	)
}

RecruitmentItem.PropTypes = {
	info: PropTypes.object.isRequired
}