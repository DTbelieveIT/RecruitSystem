import React,{ Component , PropTypes} from 'react'
import { Link } from 'react-router';
import { Card } from 'antd'
import moment from 'moment'

import './RecruitmentItem.less'

export default function RecruitmentItem(props){
	const { _id, company, recruitNum, salary ,educationRequire ,job,person,meta} = props.info
	const {online} = props
	return (
	  <Card className="RecruitmentItem" title={`${job.name}(${company.address})`} extra={online ? <Link to={{pathname:`/detail/${_id}`}}>查看详情</Link> : null}  bordered={true}>
	    <p><span>公司  :</span>{company.name}</p>
	    <p><span>招聘人数  :</span>{recruitNum}人</p>
	    <p><span>已投人数  :</span>{person.length}人</p>
	    <p><span>薪酬   :</span>{salary}元</p>
	    <p><span>学历要求   :</span>{educationRequire===0?'不限':(educationRequire===1?'专科':'本科或本科以上')}</p>
	    <p><span>发布时间   :</span>{moment(meta.createAt).format('YYYY-MM-DD')}</p>
	  </Card>
	)
}

RecruitmentItem.PropTypes = {
	info: PropTypes.object.isRequired
}