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
  		//console.log("HorizBarGraph:shouldComponentUpdate:return false")
  		return false
  	}
  	//console.log("HorizBarGraph:shouldComponentUpdate:return true")
	return true
  }

  render() {
  	//console.log("HorizBarGraph.js:render(): ")
  	//console.log(this.props)

  	if (this.props.totals == null) {
	    return (
			<div class="CardItems">
				No average data...
			</div>
	    ) 
	}

	//todo: handle not all totals being defined
	//todo: handle having a total = 0
  	var {today, yesterday, average} = this.props.totals
  	//var toMax = Object.values(this.props.totals)
  	//var max = Math.max(...toMax)
  	var max = Math.max(today.total, yesterday.total, average.total)
    return (
		<div class="CardItems">
			<Bar label="today (est.)" value={today.total} width={Math.floor(today.total/max*100)}
			 leftWidth={Math.floor(today.tillNow/today.total*100)} highlight={true} units={this.props.units} />
			<Bar label="average" value={average.total} width={Math.floor(average.total/max*100)}
			 leftWidth={Math.floor(average.tillNow/average.total*100)} units={this.props.units} />			
			<Bar label="yesterday" value={yesterday.total} width={Math.floor(yesterday.total/max*100)}
			 leftWidth={Math.floor(yesterday.tillNow/yesterday.total*100)} units={this.props.units} />
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
  		//console.log("Bar:shouldComponentUpdate:return false")
  		return false
  	}
  	//console.log("Bar:shouldComponentUpdate:return true")
	return true
  }

  render() {
  	//console.log("Bar:render(): " )
  	//console.log(this.props)

  	if (this.props.value == null) {
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
	}

	var color = this.props.highlight ? 'var(--text-background-highlight)' : 'var(--text-background)'
	var darkcolor = this.props.highlight ? 'var(--text-background-highlight-dark)' : 'var(--text-background-dark)'
	const style = {
		width: `${this.props.width}%`,
		background: 'linear-gradient(90deg, '+color+' '+`${this.props.leftWidth}%`+', '+darkcolor+' '+`${this.props.leftWidth}%`+')'
	}

	return (
		<div class="CardItem GraphBar" style={style}>
			<div class="CardItem">
				<div class="CardBodyText">
					{this.props.label}
				</div>
				<div class="CardBodyTextHighlight">
					{this.props.value}
					<div class="CardBodyUnits">
						{' '}{this.props.units}
					</div>
				</div>
			</div>
		</div>	
	)
  }
}


export default HorizBarGraph
