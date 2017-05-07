import React , { Component }from 'react'
import {connect} from 'react-redux'
import ChatPanel from '../../../components/ChatPanel';


class Chat extends Component {
	render() {
		const {linkmanId,linkman} =  this.props
		return (
			<ChatPanel linkmanId={linkmanId} linkman={linkman}/>		
		)
	}
}

function mapStateToProps(state,ownProps){
	let linkmanId = ownProps.params.id
	let linkman = ownProps.params.account
	return {
		linkmanId:linkmanId,
		linkman:linkman
	}
}

module.exports = connect(mapStateToProps)(Chat)