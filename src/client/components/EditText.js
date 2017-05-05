import React,{PropTypes} from 'react'
require('../style/EditText.less')

class EditText extends React.Component{
	constructor(props){
		super(props)
	}

	handleChange(e){
		let value = e.target.value
		console.log('EditText change')
		this.props.onChange(this,this.props.id,value)
	}

	render(){
		return (
			<div id={this.props.id} className="edit-text" style={{
				width:this.props.width,
				margin:this.props.margin,	
				display:this.props.display			
			}}>
				<input type={this.props.type} placeholder={this.props.placeholder} onChange={this.handleChange.bind(this)} name={this.props.name} value={this.props.value} />
			</div>
		)
	}
}

EditText.PropTypes = {
	id:PropTypes.string.isRequired,
	type:PropTypes.string.isRequired,
	placeholder:PropTypes.string.isRequired,
	onChange:PropTypes.func.isRequired,
	value:PropTypes.string.isRequired,
	width:PropTypes.string.isRequired,
	margin:PropTypes.string.isRequired,
}

EditText.defaultProps = {
	id:'',
	type:'text',
	placeholder:'',
	onChange:(value)=>{},
	value:'',
	width:'400px',
	margin:'0 0 0 0',
	display:'block'
}

export default EditText