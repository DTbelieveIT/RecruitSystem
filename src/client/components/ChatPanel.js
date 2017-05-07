import React , { Component }from 'react'
import {connect} from 'react-redux'
import {GETHISTORYMESSAGE} from '../constants/Const'
import {getHistoryMessage} from '../actions/message'

import './chatPanel.less'

import MessageList from '../components/MessageList'
import InputBox from '../components/InputBox'

class ChatPanel extends Component {
    constructor(props){
        super(props)
    }

    componentDidMount(){
        this.props.dispatch(getHistoryMessage('/api/getHistoryMessage'))
    }

    render() {
        const {linkmanId,linkman,info} =  this.props
        let messages = info

        return (
            <div className="chat-panel">
                <div>与{linkman}的聊天页面</div>
                <MessageList.container
                    // linkmanId={linkman.get('_id')}
                    // linkmanType={linkman.get('type')}
                    // messagesCount={linkman.get('messages').size}
                >
                    {
                        messages.map((message)=>(
                            <MessageList.item message={message.content} linkmanId={message.from.account} />
                        ))
                        // linkman.get('messages').map((message) => (
                        //     <MessageList.item
                        //         key={linkman.get('type') + message.get('_id')}
                        //         me={me}
                        //         message={message}
                        //         linkmanId={linkman.get('_id')}
                        //         linkmanType={linkman.get('type')}
                        //     />
                        // ))
                    }
                </MessageList.container>
                <InputBox linkmanId={linkmanId} meId={this.props.meId} me={this.props.me}/>
            </div>         
        )
    }
}

function mapStateToProps(state){
    return {
        meId:state.loginReducer.data.user._id,
        me:state.loginReducer.data.user.account,
        info:state.messageReducer.message.result || []
    }
}

module.exports = connect(mapStateToProps)(ChatPanel)

            