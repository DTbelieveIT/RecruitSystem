import React,{ Component , PropTypes} from 'react'
import {connect} from 'react-redux'
import { Col, Row } from 'antd';
import defineHistory from '../../../history'
import RecruitmentItem from '../../../components/RecruitmentItem';
import recruitment from '../../../actions/recruitment'

import './RecruitmentList.less'

class RecruitmentList extends React.Component {
	constructor(props){
		super(props)
	}

  componentWillMount(){
    recruitment.queryRecruitmentList()
  }

  get recruitmentList() {
    let online = (Object.keys(this.props.user).length !== 0)
    return this.props.infos.map(info => <Col span="8" style={{padding:'10px'}}><RecruitmentItem info={info} key={info._id} online={online} /></Col>)
  }

  render() {
    return (
      <div className="RecruitmentList">
        <Row>
        { this.recruitmentList }
        </Row>
      </div>
    )
  }
}


function mapStateToProps(state){
	return {
    infos:state.recruitment.infos || [],
    user:state.user.user || {},
	}
}


module.exports = connect(mapStateToProps)(RecruitmentList)
