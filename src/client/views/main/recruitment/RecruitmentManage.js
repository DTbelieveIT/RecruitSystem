import React,{ Component } from 'react'
import {connect} from 'react-redux'
import defineHistory from '../../../history'
import {Popover,Button} from 'antd'
import {ls} from '../../../util/util'

import './RecruitmentManage.less'

let mapStatus = ['待处理','拒绝','邀请面试','面试失败','面试成功']
let mapColor = ['yellow','red','blue','red','green']

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
      let content
      if(info.person.length > 0){
        content = <div className="rm_content">
            <ul>
                {info.person.map((item) => 
                  <li >
                    <a onClick={()=>this.onEnter(item.user._id,info._id)} >
                      {item.user.account}
                    </a>
                    <span className={`status ${mapColor[item.status]}`}>{mapStatus[item.status]}</span>
                  </li>)
                }
            </ul>
        </div>
      }else{
        content = '暂无投递者'
      }

      return (
        <li>
        <Popover placement="rightTop" content={content} >
          <Button>
            {`${info.job.name}(`}<span style={{color:'red'}}>{info.person.length}</span>)人
          </Button>
        </Popover>        
        </li>
      )
    })
    return (
      <div className="RecruitmentManage">
        <h1>贵公司有{infos.length}个招聘岗位</h1>
        <div className="wrap">
          <ul className="data">{data}</ul>
        </div>
      </div>
    )
  }
}


function mapStateToProps(state,ownProps){
  let {cid} = ownProps.params
  if(Object.keys(state.recruitment).length !== 0){
    ls.setItem('recruitment',state.recruitment)
  }
  state.recruitment = ls.getItem('recruitment')

  let infos = state.recruitment.infos.filter((info) => {
    return info.company._id === cid
  })



  return {
    cid:cid,
    infos:infos,
  }
}


module.exports = connect(mapStateToProps)(RecruitmentManage)
