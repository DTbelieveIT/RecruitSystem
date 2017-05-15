import React,{ Component } from 'react'
import {connect} from 'react-redux'
import defineHistory from '../../../history'


class RecruitmentAdmin extends Component{
  constructor(props){
    super(props)
  }


  render(){
    return (
      <div className="RecruitmentAdmin">
        <h1>
          招聘信息管理页
        </h1>
      </div>
    )
  }
}


function mapStateToProps(state,ownProps){
  return {
  }
}


module.exports = connect(mapStateToProps)(RecruitmentAdmin)
