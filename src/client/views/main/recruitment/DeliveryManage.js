import React,{ Component } from 'react'
import {connect} from 'react-redux'
import {Tooltip} from 'antd'
import {ls} from '../../../util/util'

import './DeliveryManage.less'

let mapStatus = ['待处理','拒绝','邀请面试','面试失败','面试成功']
let mapColor = ['yellow','red','blue','red','green']

class DeliveryManage extends Component{
  onEnter = (uid,rid) => {
    this.props.router.push(`/delivery/${uid}/${rid}`)
  }

  render(){
    let {infos,uid} = this.props,target
    let data = infos.map((info) => {
      target = info.person.find((item) => {
        return item.user._id.toString() === uid
      })
      return (
        <li>
            <a onClick={()=>this.onEnter(uid,info._id)} >
              <span className="company">{info.company.name}</span>{'  '}
              <span className="job">{info.job.name}</span>{'  '}
              <span className={`status ${mapColor[target['status']]}`}>{mapStatus[target['status']]}</span>
            </a>
        </li>
      )
    })
    return (
      <div className="DeliveryManage">
        <h1>亲爱的用户,你投递的岗位情况如下:</h1>
        <ul>{data}</ul>
      </div>
    )
  }
}


function mapStateToProps(state,ownProps){
  let {uid} = ownProps.params
  let existed
  if(Object.keys(state.recruitment).length !== 0){
    ls.setItem('recruitment',state.recruitment)
  }
  state.recruitment = ls.getItem('recruitment')  
  let infos = state.recruitment.infos.filter((info) => {
    existed = info.person.some((item) => {
      if(item.user._id.toString() === uid){
        return true
      }
      return false
    })
    return existed
  })

  return {
    uid:uid,
    infos:infos,
  }
}


module.exports = connect(mapStateToProps)(DeliveryManage)
