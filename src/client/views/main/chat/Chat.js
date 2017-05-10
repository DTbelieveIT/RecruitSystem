import React , { Component }from 'react'
import {connect} from 'react-redux'
import ChatPanel from '../../../components/ChatPanel';
import _ from 'underscore'


class Chat extends Component {
	render() {
		const {linkmanId,linkman} =  this.props
		return (
			<ChatPanel linkmanId={linkmanId} linkman={linkman}/>		
		)
	}
}

function mapStateToProps(state,ownProps){
	//公司id
	let linkmanId = ownProps.params.id
	let linkman = _.filter(state.recruitment.infos || [],function(info){
		return info.company._id === linkmanId
	})

	return {
		linkmanId:linkman[0].company._id,//企业用户id
		linkman:linkman[0],//企业用户详细信息
	}
}

module.exports = connect(mapStateToProps)(Chat)