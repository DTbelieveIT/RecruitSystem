import React , { Component,PropTypes }from 'react'
import {connect} from 'react-redux'
import MessageList from '../components/MessageList'
import InputBox from '../components/InputBox'
import message from '../actions/message'
import socket from '../socket'

import './chatPanel.less'

class ChatPanel extends Component {
    constructor(props){
        super(props)
        this.state = {
            messages:[]
        }
    }

    handleInput = (data) => {
        let tmp = this.state.messages
        this.setState({
            messages:[...tmp,data]
        })
    }

    componentDidMount(){
        let {meId,linkmanId} = this.props

        message
        .getHistoryMessage({linkmanId:linkmanId,meId:meId,msgType:'chat'})
        .then(result => {
            console.log('获取历史消息了，更新readed')
            this.setState({
                messages:result.data.messages
            })
        })    

        //socket监听new message事件
        socket.on('new message',data => {
            let tmp = this.state.messages
            this.setState({
                messages:[...tmp,data]
            })
        })
    }

    componentDidUpdate(){
        let {meId,linkmanId,linkman} = this.props
        let id = linkman.person && linkman.person._id || linkman.company&&linkman.company._id
        if(linkmanId === id){
            return;
        }
        message
        .getHistoryMessage({linkmanId:linkmanId,meId:meId,msgType:'chat'})
        .then(result => {
            console.log('获取历史消息了，更新readed')
            this.setState({
                messages:result.data.messages
            })
        })      
    }

    render() {
        const {linkmanId,linkman,info,meId} =  this.props
        let name = linkman && (linkman.name || linkman.resume&&linkman.resume.name)
        let account = linkman && (linkman.person && linkman.person.account || linkman.company &&linkman.company.account)
        let messages = this.state.messages
        return (
            <div className="chat-panel">
                <h1>与{name}( {account} )聊天中</h1>
                <MessageList.container>
                    {
                        messages.map((message,index)=>(
                            <MessageList.item key={index} message={message.content} linkman={message.account} createAt={message.createAt} imgPath={message.imgPath} me={message.from===meId} />
                        ))
                    }
                </MessageList.container>
                <InputBox linkmanId={linkmanId} meId={meId} handleInput={this.handleInput} />
            </div>         
        )
    }
}

function mapStateToProps(state){
    if(state.user.user){
        window.localStorage.setItem('meId',state.user.user._id)
    }
    return {
        meId:state.user.user && state.user.user._id || window.localStorage.getItem('meId'),
    }
}

module.exports = connect(mapStateToProps)(ChatPanel)

            