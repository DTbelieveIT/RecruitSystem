import React,{ Component } from 'react'
import {connect} from 'react-redux'
import {contains} from '../../../util/util'
import message from '../../../actions/message'
import {ls} from '../../../util/util'

import './DeliveryDetail.less'

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
      <div className="DeliveryDetail">
        <h1>{this.props.info.company.name}的{this.props.info.job.name}岗位招聘状态如下:</h1>
        <div className="result">
            <label>结果   :</label>
            <span>{mapStatus[this.props.target['status']]}</span>
        </div>
        { contains([1,3,4],this.props.target['status']) ? 
          <div className="evaluate">
              <label>{this.props.info.company.name}对你的评价   :</label>        
              <span>{this.props.target['evaluate']}</span> 
          </div>
        : null}
      </div>
    )
  }
}


function mapStateToProps(state,ownProps){
  let {uid,rid} = ownProps.params
  if(Object.keys(state.recruitment).length !== 0){
    ls.setItem('recruitment',state.recruitment)
  }
  state.recruitment = ls.getItem('recruitment')
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