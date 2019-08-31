import React, { Component } from 'react';
import './dashboard.css';
import '../fonts/material-design-icons/iconfont/material-icons.css'

class HorizBarGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
  	var {today, yesterday, average} = this.props
  	var max = Math.max(today, yesterday, average)
    return (
		<div class="CardItems">
			<Bar label="today (est.)" value={today} width={Math.floor(today/max*100)} highlight={true} {...this.props} />
			<Bar label="yesterday" value={yesterday} width={Math.floor(yesterday/max*100)} {...this.props} />
			<Bar label="average" value={average} width={Math.floor(average/max*100)} {...this.props} />
		</div>
    );
  }
}

function Bar(props) {
	var color = props.highlight ? 'var(--text-background-highlight)' : 'var(--text-background)'
	const style = {
		width: `${props.width}%`,
		backgroundColor: color
	}
	return (
		<div class="CardItem GraphBar" style={style}>
			<div class="CardItem">
				<div class="CardBodyText">
					{props.label}
				</div>
				<div class="CardBodyTextHighlight">
					{props.value} {props.units}
				</div>
			</div>
		</div>	
	);
}


export default HorizBarGraph
