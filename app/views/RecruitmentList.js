import React,{ Component , PropTypes} from 'react'
import {connect} from 'react-redux'
import {fetchDataIfNeed} from '../actions'
import defineHistory from '../history'
import {RECRUITMENTLIST,CLEAR} from '../constants/Const'
import RecruitmentItem from '../components/RecruitmentItem';
import { Col, Row } from 'antd';

class RecruitmentList extends React.Component {
	constructor(props){
		super(props)
	}

  componentDidMount(){
    this.props.queryRecruitmentList({
        method:'GET',
        path:'/recruitmentList',
        category:RECRUITMENTLIST,
    })
  }

  componentWillUnmount(){
    this.props.clear()
  }  

  get recruitmentList() {
    return this.props.data.infos.map(info => <Col span="8" style={{padding:'10px'}}><RecruitmentItem info={info} key={info._id} /></Col>)
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

RecruitmentList.PropTypes = {
  data:PropTypes.object.isRequired,
}


function mapStateToProps(state){
	return {
    data:state.recruitmentReducer.data || {code:500,infos:[]}
	}
}

function mapDispatchToProps(dispatch){
  return {
    queryRecruitmentList: (options) => dispatch(fetchDataIfNeed(options)),
    clear: () => dispatch({type:RECRUITMENTLIST+CLEAR}),
  }
}

module.exports = connect(mapStateToProps,mapDispatchToProps)(RecruitmentList)
