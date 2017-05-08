import React,{ Component , PropTypes} from 'react'
import {connect} from 'react-redux'
import { Col, Row } from 'antd';
import defineHistory from '../../../history'
import RecruitmentItem from '../../../components/RecruitmentItem';
import recruitment from '../../../actions/recruitment'

class RecruitmentList extends React.Component {
	constructor(props){
		super(props)
	}

  componentWillMount(){
    recruitment.queryRecruitmentList()
  }

  get recruitmentList() {
    return this.props.infos.map(info => <Col span="8" style={{padding:'10px'}}><RecruitmentItem info={info} key={info._id} /></Col>)
  }

  render() {
    return (
      <div style={{padding: '30px' }}>
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
	}
}


module.exports = connect(mapStateToProps)(RecruitmentList)
