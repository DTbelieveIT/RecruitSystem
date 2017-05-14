import React,{ Component } from 'react'
import {connect} from 'react-redux'
import {contains} from '../../../util/util'
import message from '../../../actions/message'

let mapStatus = ['你的简历处于待处理之中...','抱歉,你被拒绝了!','恭喜你进入面试阶段,请好好准备!','抱歉,面试失败了!','恭喜啦,面试成功!']

class DeliveryDetail extends Component{
  constructor(props){
    super(props)
  }

  componentDidMount(){
    let {uid,rid} = this.props
    message.updateRecruitMessage({uid,rid})
  }

  render(){
    return (
      <div>
        <h1>{this.props.info.company.name}的{this.props.info.job.name}岗位招聘状态如下:</h1>
        <span>{mapStatus[this.props.target['status']]}</span>
        { contains([1,3,4],this.props.target['status']) ? <span>企业对你的评价:{this.props.target['evaluate']}</span> : null}
      </div>
    )
  }
}


function mapStateToProps(state,ownProps){
  let {uid,rid} = ownProps.params
  let info = state.recruitment.infos.find((item) => {
    return item._id.toString() === rid
  })
  let target = info.person.find((item) => {
    return item.user._id.toString() === uid
  })

  return {
    uid:uid,
    rid:rid,
    info:info,
    target:target,
  }
}


module.exports = connect(mapStateToProps)(DeliveryDetail)