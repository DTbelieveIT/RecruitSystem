import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
require('../style/Radio.less')

class Radio extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
	    const _options = this.props.options;
	    for(let i=0; i<_options.length; i++){
	    	if(_options[i].checked){
	    		ReactDOM.findDOMNode(this.refs['radio-'+ i]).className = 'on';
	    	}else{
	    		ReactDOM.findDOMNode(this.refs['radio-'+ i]).className = '';
	    	}
	    }
	}
	componentWillReceiveProps(nextProps) {
	    const _options = nextProps.options;
	    for(let i=0; i<_options.length; i++){
	    	if(_options[i].checked){
	    		ReactDOM.findDOMNode(this.refs['radio-'+ i]).className = 'on';
	    	}else{
	    		ReactDOM.findDOMNode(this.refs['radio-'+ i]).className = '';
	    	}
	    }
	}

	handleChecked(index){
		for(let i in this.refs){
			ReactDOM.findDOMNode(this.refs[i]).className = ''
			ReactDOM.findDOMNode(this.refs[i]).firstChild.checked = false
		}
		const _this = ReactDOM.findDOMNode(this.refs['radio-' + index])
		_this.className = 'on'
		_this.firstChild.checked = true
	}

	render() {
		return (
			<div id={this.props.id}>
				{this.props.options.map((item,index) => {
					return (
						<div key={index} ref={'radio-'+index} onClick={this.handleChecked.bind(this,index)}>
							<input type="radio" name={item.name}  value={item.value} defaultChecked={item.checked} onChange={this.props.onChange.bind(this,index)} />
							<span>{item.text}</span>
						</div>
					)
				})}
			</div>
		)
	}
}

Radio.PropTypes = {
	options:PropTypes.object.isRequired,
	onChange:PropTypes.func.isRequired
};

Radio.defaultProps = {
	id:'',
	option:{},
	onChange:()=>{},
}

export default Radio;