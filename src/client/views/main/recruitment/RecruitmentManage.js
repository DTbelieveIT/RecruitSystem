import React,{ Component } from 'react'
import {connect} from 'react-redux'
import defineHistory from '../../../history'
import {Tooltip} from 'antd'

import './RecruitmentManage.less'

class RecruitmentManage extends Component{
  constructor(props){
    super(props)
  }

  onEnter = (uid,rid) => {
    this.props.router.push(`/recruitment/${uid}/${rid}`)
  }

  render(){
    let {infos} = this.props
    let data = infos.map((info) => {
      let text
      if(info.person.length > 0){
        text = <ul>
            {info.person.map((item) => 
              <li>
                <a onClick={()=>this.onEnter(item.user._id,info._id)} >
                  {item.user.account}
                  <span>状态{item.status}</span>
                </a>
              </li>)
            }
        </ul>
      }else{
        text = ''
      }

      return (
        <li>
          <Tooltip placement="rightTop" title={text}>
            <a href="#">{`${info.job.name}(${info.person.length})人`}</a>
          </Tooltip>
        </li>
      )
    })
    return (
      <div>
        <h1>我是招聘信息管理页</h1>
        <ul>{data}</ul>
      </div>
    )
  }
}


function mapStateToProps(state,ownProps){
  let {cid} = ownProps.params
  let infos = state.recruitment.infos.filter((info) => {
    return info.company._id === cid
  })

  return {
    cid:cid,
    infos:infos,
  }
}


module.exports = connect(mapStateToProps)(RecruitmentManage)
