import React, { Component } from 'react';
import './dashboard.css';
import '../fonts/material-design-icons/iconfont/material-icons.css'

class HorizBarGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  shouldComponentUpdate(nextProps){
  	if(nextProps.totals == null){
  		console.log("HorizBarGraph:shouldComponentUpdate:return false")
  		return false
  	}
  	console.log("HorizBarGraph:shouldComponentUpdate:return true")
	return true
  }

  render() {
  	console.log("HorizBarGraph.js:render(): ")
  	console.log(this.props)

  	if (this.props.totals == null) {
	    return (
			<div class="CardItems">
				No data...
			</div>
	    ) 
	}

  	//var today = (if this.props.totals.today ? this.props.totals.today : undefined)
  	//var yesterday = (if this.props.totals.yesterday ? this.props.totals.yesterday : undefined)
  	//var average = (if this.props.totals.average ? this.props.totals.average : undefined)
  	var {today, yesterday, average} = this.props.totals
  	var toMax = Object.values(this.props.totals)
  	var max = Math.max(...toMax)
    return (
		<div class="CardItems">
			<Bar label="today (est.)" value={today} width={Math.floor(today/max*100)} highlight={true} units={this.props.units} />
			<Bar label="yesterday" value={yesterday} width={Math.floor(yesterday/max*100)} units={this.props.units} />
			<Bar label="average" value={average} width={Math.floor(average/max*100)} units={this.props.units} />
		</div>
    )
  }
}


class Bar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  shouldComponentUpdate(nextProps){
  	if(nextProps.value == null){
  		console.log("Bar:shouldComponentUpdate:return false")
  		return false
  	}
  	console.log("Bar:shouldComponentUpdate:return true")
	return true
  }

  render() {
  	console.log("Bar:render(): " )
  	console.log(this.props)

  	if (this.props.value == null) {
	    return (
			<div class="CardItem GraphBar">
				<div class="CardItem">
					<div class="CardBodyText">
						{this.props.label}
					</div>
					<div class="CardBodyTextHighlight">
						... No data ...
					</div>
				</div>
			</div>	
	    ) 
	}

	var color = this.props.highlight ? 'var(--text-background-highlight)' : 'var(--text-background)'
	const style = {
		width: `${this.props.width}%`,
		backgroundColor: color
	}

	return (
		<div class="CardItem GraphBar" style={style}>
			<div class="CardItem">
				<div class="CardBodyText">
					{this.props.label}
				</div>
				<div class="CardBodyTextHighlight">
					{this.props.value} {this.props.units}
				</div>
			</div>
		</div>	
	)
  }
}


export default HorizBarGraph
