import React,{ Component } from 'react'
import {connect} from 'react-redux'
import {Button,Tabs} from 'antd'
import defineHistory from '../../../history'
import admin from '../../../actions/admin'
import user from '../../../actions/user'

import './UserAdmin.less'

const TabPane = Tabs.TabPane;

class UserAdmin extends Component{
  constructor(props){
    super(props)
    this.state = {
      value:0
    }
  }

  componentDidMount(){
      admin.getAllUserInfo()
  }   

  handleChange = (key) => {
  }

  handleDel = (role,id) => {
    user.delUserInfo({role,id})
  }

  onEnter = (type,role,id) => {
    if(type === 'setting'){
      this.props.router.push(`/admin/setting/${role}/${id}`)
    }
    if(type === 'detail') {
      this.props.router.push(`/admin/detail/${role}/${id}`)
    }
  }

  render(){
    let {admins,people,companys} = this.props
    let {value} = this.state
    let pInfo = people.map((item,key) => {
      return <li key={key}>
        <a className="detail" onClick={()=>this.onEnter('detail',0,item._id)}>{`${item.person.account}(${item.resume.name})`}</a>
        <div>
          <a className="setting" onClick={()=>this.onEnter('setting',0,item._id)}>编辑</a>
          <a className="del" onClick={()=>this.handleDel(0,item._id)}>删除</a>
        </div>
      </li>
    })
    let cInfo = companys.map((item,key) => {
      return <li key={key}>
        <a className="detail" onClick={()=>this.onEnter('detail',1,item._id)}>{`${item.company.account}(${item.name})`}</a>
        <div>
          <a className="setting" onClick={()=>this.onEnter('setting',1,item._id)}>编辑</a>
          <a className="del" onClick={()=>this.handleDel(1,item._id)}>删除</a>          
        </div>
      </li>
    })    
    let aInfo = admins.map((item,key) => {
      return <li key={key}>
        <a className="detail" onClick={()=>this.onEnter('detail',2,item._id)}>{`${item.adminstrator.account}(${item.name})`}</a>
        <div>
          <a className="setting" onClick={()=>this.onEnter('setting',2,item._id)}>编辑</a>
          <a className="del" onClick={()=>this.handleDel(2,item._id)}>删除</a>
        </div>
      </li>
    })

    return (
      <div className="UserAdmin">
        <h1>用户信息管理页</h1>
        <div className="wrap">
         <Tabs defaultActiveKey="1" onChange={this.handleChange}>
          <TabPane tab={`普通用户(${people.length})人`} key="0"><ul>{pInfo}</ul></TabPane>
          <TabPane tab={`企业用户(${companys.length})人`} key="1"><ul>{cInfo}</ul></TabPane>
          <TabPane tab={`管理员用户(${admins.length})人`} key="2"><ul>{aInfo}</ul></TabPane>
        </Tabs>
        </div>    
      </div>
    )
  }
}


function mapStateToProps(state,ownProps){
  return {
    admins:state.admin.admins || [],
    people:state.admin.people || [],
    companys:state.admin.companys || [],
  }
}


module.exports = connect(mapStateToProps)(UserAdmin)
