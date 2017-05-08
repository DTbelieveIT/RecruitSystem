import React , { Component }from 'react'
import {connect} from 'react-redux'
import message from '../actions/message'

import './InputBox.less'

class InputBox extends Component {
    handleInputKeyDown = (e) => {
        // 过滤tab键
        if (e.keyCode === 9) {
            e.preventDefault();
            return;
        }
        if (e.keyCode === 13 && !e.shiftKey) {
            e.preventDefault();

            const message = this.input.value;
            this.input.value = '';
            if (message.trim() === '') {
                return;
            }
            message.sendMessage({meId:this.props.meId,linkmanId:this.props.linkmanId,content:message,me:this.props.me})
        }        
    }

    render() {
        return (
            <div
                className="input-box"
            >
                <input
                    type="text"
                    ref={input => this.input = input}
                    placeholder="输入消息"
                    onKeyDown={this.handleInputKeyDown}
                />
            </div>      
        )
    }
}

function mapStateToProps(state,ownProps){
    return {}
}

module.exports = connect(mapStateToProps)(InputBox)