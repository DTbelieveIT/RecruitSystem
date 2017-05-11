import React , { Component }from 'react'
import message from '../actions/message'
import moment from 'moment'

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

            const msg = this.input.value;
            this.input.value = '';
            if (msg.trim() === '') {
                return;
            }

            message
            .addMessage({content:msg,meId:this.props.meId,linkmanId:this.props.linkmanId})
            .then(result => {
                if(result.status === 200){                    
                    this.props.handleInput({content:result.data.content,account:result.data.from.account,imgPath:result.data.from.imgPath,from:result.data.from._id,createAt:moment(result.data.meta.createAt).format('YYYY-MM-DD HH:mm:ss')})
                }
            })
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

module.exports = InputBox