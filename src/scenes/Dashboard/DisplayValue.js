import React, { Component } from 'react';
import './dashboard.css';
import '../fonts/material-design-icons/iconfont/material-icons.css'

export class DisplayValueSeparateUnits extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  shouldComponentUpdate(nextProps){
  	if(nextProps.value == null){
  		//console.log("DisplayValueSeparateUnits:shouldComponentUpdate:return false")
  		return false;
  	}
  	//console.log("DisplayValueSeparateUnits:shouldComponentUpdate:return true")
	return true;
  }

  render() {
  	//console.log("DisplayValueSeparateUnits.js:render(): ")
  	//console.log(this.props)

  	if(this.props.value === null || this.props.value === undefined){
		return (
			<React.Fragment>
				---
				<div class="CardBodyUnits">
					{' '}{this.props.units}
				</div>
			</React.Fragment>
		); 
	}

	return (
		<React.Fragment>
			{this.props.value}
			<div class="CardBodyUnits">
				{' '}{this.props.units}
			</div>
		</React.Fragment>
	);
  }
}

export class DisplayValueAndUnits extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  shouldComponentUpdate(nextProps){
  	if(nextProps.value == null){
  		//console.log("DisplayValueAndUnits:shouldComponentUpdate:return false")
  		return false;
  	}
  	//console.log("DisplayValueAndUnits:shouldComponentUpdate:return true")
	return true;
  }

  render() {
  	//console.log("DisplayValueAndUnits.js:render(): ")
  	//console.log(this.props)

  	if(this.props.value === null || this.props.value === undefined){
		return (
			<React.Fragment>
				--{this.props.units}
			</React.Fragment>
		); 
	}

	return (
		<React.Fragment>
			{this.props.value}{this.props.units}
		</React.Fragment>
	);
  }
}

class DisplayColumn extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  shouldComponentUpdate(nextProps){
  	if(nextProps.value == null){
  		//console.log("DisplayColumn:shouldComponentUpdate:return false")
  		return false;
  	}
  	//console.log("DisplayColumn:shouldComponentUpdate:return true")
	return true;
  }

  render() {
  	//console.log("DisplayColumn.js:render(): ")
  	//console.log(this.props)

  	if(this.props.value === null || this.props.value === undefined){
		return (
	        <div class="DisplayColumn">
	            <div class="CardBodyText">
	                {this.props.label}
	            </div>
	            <div class="ValueDisplay">
	                ---
	            </div>
	        </div>
		); 
	}

	return (
        <div class="DisplayColumn">
            <div class="CardBodyText">
                {this.props.label}
            </div>
            <div class="ValueDisplay">
                <DisplayValueAndUnits value={this.props.value} units={this.props.units}/>
            </div>
        </div>
	);
  }
}
