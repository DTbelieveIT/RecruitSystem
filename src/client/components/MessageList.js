import React , { Component }from 'react'
import {connect} from 'react-redux'

import './MessageList.less'

class MessageList extends Component {
    render() {
        return (
            <div
                className="message-list"
                ref={list => this.list = list}
            >
                { this.props.children }
            </div>    
        )
    }
}

class Message extends Component {
    render() {
        const { linkman,message,createAt,imgPath,me} = this.props
        return (
            <div
                className={'message-list-item'}
                ref={dom => this.dom = dom}
            >
                <div className={me ? 'message me' : 'message'}>
                    <img className="message-image" src={imgPath} />
                    <div>
                        <div>
                            <span className="message-username">{linkman}</span>
                            <span>{createAt}</span>
                        </div>
                        <div className="text">{message}</div>
                    </div>
                </div>
            </div>   
        )
    }
}


module.exports = {
    container: MessageList,
    item: Message,
}