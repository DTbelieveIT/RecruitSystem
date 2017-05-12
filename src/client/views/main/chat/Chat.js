import React , { Component }from 'react'
import {connect} from 'react-redux'
import ChatPanel from '../../../components/ChatPanel';
import _ from 'underscore'
import user from '../../../actions/user'
import {ls} from '../../../util/util'
 
import './Chat.less'

class Chat extends Component {
	constructor(props){
		super(props)
		this.state ={
			linkman:{},
		}
	}

	componentWillMount(){
		//获取联系人信息
		let {linkmanId} =  this.props
		user
		.getUserInfo(linkmanId)
		.then(result => {
			this.setState({
				linkman:result.info
			})
		})
	}

    componentDidUpdate(){
        let {linkmanId} = this.props
        let {linkman} = this.state     
        let id = linkman.person && linkman.person._id || linkman.company&&linkman.company._id
        if(linkmanId === id){
            return;
        }
		user
		.getUserInfo(linkmanId)
		.then(result => {
			ls.setItem('linkman',result.info)
			this.setState({
				linkman:result.info
			})
		})      	
    }

	render() {
		const {linkmanId} =  this.props
		const {linkman} = this.state || ls.getItem('linkman')
		return (
			<ChatPanel linkmanId={linkmanId} linkman={linkman}/>		
		)
	}
}

function mapStateToProps(state,ownProps){
	//聊天对象的用户id
	let linkmanId = ownProps.params.id

	return {
		linkmanId:linkmanId
	}
}

module.exports = connect(mapStateToProps)(Chat)