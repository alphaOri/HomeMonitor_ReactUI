import React, { Component } from 'react';
import './dashboard.css';
import '../fonts/material-design-icons/iconfont/material-icons.css'

class SourceLabels extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  shouldComponentUpdate(nextProps){
  	if(nextProps.sources == null){
  		//console.log("SourceLabels:shouldComponentUpdate:return false")
  		return false
  	}
  	//console.log("SourceLabels:shouldComponentUpdate:return true")
	return true
  }

  render() {
  	//console.log("SourceLabels.js:render(): ")
  	//console.log(this.props)

  	if (this.props.sources == null) {
	    return (
			<div class="CardItems">
				No source data...
			</div>
	    ) 
	}

    return (
		<div class="CardItems">
			<div class="LabelContainer">
			    {this.props.sources.map((source, index) => (
			        <Label key={index} text={source.name+"-"+source.clicks} />
			    ))}
			</div>
		</div>
    )
  }
}


class Label extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  shouldComponentUpdate(nextProps){
  	if(nextProps.text == null){
  		//console.log("Label:shouldComponentUpdate:return false")
  		return false
  	}
  	//console.log("Label:shouldComponentUpdate:return true")
	return true
  }

  render() {
  	//console.log("Label:render(): " )
  	//console.log(this.props)

  	/*if (this.props.text == null) {
	    return (
			<div class="CardItem GraphBar">
				<div class="CardItem">
					<div class="CardBodyText">
						{this.props.label}
					</div>
					<div class="CardBodyText">
						No data
					</div>
				</div>
			</div>	
	    ) 
	}*/

	return (
        <div class="Label">
            <div class="LabelText">
                {this.props.text}
            </div>
        </div>
	)
  }
}


export default SourceLabels
