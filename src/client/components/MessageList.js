import React , { Component }from 'react'
import {connect} from 'react-redux'

import './MessageList.less'

class MessageList extends Component {

    handleInputKeyDown = () => {

    }

    render() {
        return (
            <div
                className="message-list"
                ref={list => this.list = list}
                onScroll={this.handleOnScroll}
            >
                { this.props.children }
            </div>    
        )
    }
}

class Message extends Component {
    render() {
        const { linkmanId,message } = this.props
        return (
            <div
                className={'message-list-item'}
                ref={dom => this.dom = dom}
            >
                 {linkmanId}{' : '}{ message }
            </div>   
        )
    }
}


function mapStateToProps(state,ownProps){
    return {}
}

module.exports = {
    container: MessageList,
    item: connect(mapStateToProps)(Message)
}