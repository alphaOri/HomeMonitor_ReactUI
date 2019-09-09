import React, { Component } from 'react';
import './dashboard.css';
import '../fonts/material-design-icons/iconfont/material-icons.css'

class DisplayValue extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  shouldComponentUpdate(nextProps){
  	if(nextProps.value == null){
  		console.log("DisplayValue:shouldComponentUpdate:return false")
  		return false;
  	}
  	console.log("DisplayValue:shouldComponentUpdate:return true")
	return true;
  }

  render() {
  	console.log("DisplayValue.js:render(): ")
  	console.log(this.props)

  	if(this.props.value === null || this.props.value === undefined){
		return (
			<div class="CardBodyTextHighlightCentered">
				--- {this.props.units}
			</div>
		); 
	}

	return (
		<div class="CardBodyTextHighlightCentered">
			{this.props.value} {this.props.units}
		</div>
	);
  }
}

export default DisplayValue
