import React, { Component, PropTypes } from 'react'
import { Dropdown, Menu,  Icon } from 'antd';
import { connect } from 'react-redux'
import {Link} from 'react-router'
import defineHistory from '../history'
import user from '../actions/user'
import mymessage from '../actions/message'
import ui from '../actions/ui'

class MDropdown extends React.Component {
    constructor(props){
      super(props)
    }

    handleLogoutClick = () => {
        user
            .logout()
            .then(response => {
                if (response.status === 200) {
                    defineHistory.push('/')
                    window.localStorage.removeItem('token');
                    window.localStorage.removeItem('userid');
                    ui.openNotification('logout success')
                    user.init()
                    mymessage.init()
                }
            })
    }

    render() {
        const menu = (
        <Menu>
          <Menu.Item>
           <Link to="/main/setting">设置</Link>
          </Menu.Item>
          <Menu.Item>
           <Link to="/" onClick={this.handleLogoutClick}>登出</Link>       
          </Menu.Item>
        </Menu>
        )

        return (
            <div>
              <Dropdown overlay={menu}>
                <a className="ant-dropdown-link" href="#">
                {this.props.role === 0 ? '普通用户':(this.props.role === 1 ?'企业用户':'管理员')}{'  :  '}{this.props.account} <Icon type="caret-down" />
                </a>
              </Dropdown>
            </div>
        );
    }
}

export default MDropdown