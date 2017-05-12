import React,{ Component } from 'react'
import {connect} from 'react-redux'
import defineHistory from '../../../history'


class RecruitmentManage extends Component{
  render(){
    return (
      <div>我是招聘信息管理页</div>
    )
  }
}


function mapStateToProps(state,ownProps){
  let {cid} = ownProps.params
  console.log(`公司的id: ${cid}`)
  return {
    cid:cid
  }
}


module.exports = connect(mapStateToProps)(RecruitmentManage)
