import React, { Component } from 'react'
import './dashboard.css'
import '../fonts/material-design-icons/iconfont/material-icons.css'
import HorizBarGraph from './HorizBarGraph'
import CardHeader from './CardHeader'

class WaterCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
    	usage: 0,
    	flow: 0
    }
  }

  /*componentDidMount() {
  	// request historical data
  	// update the state
  }*/

  componentWillReceiveProps() {
  	if(this.props.waterData){
		if(this.props.waterData.usage){
	    	//this.setState({ usage: this.props.waterData.usage })
	  		this.setState((state, props) => ({
			  usage: this.props.waterData.usage
			}))
	    }
	    if(this.props.waterData.flow){
	    	//this.setState({ flow: this.props.waterData.flow })
			this.setState((state, props) => ({
			  flow: this.props.waterData.flow
			}))
	    }
	}
  }

  render() {

    return (
		<div class="CardContainer">
			<CardHeader title="Water"/>
			<div class="CardBody">
				<div class="CardItems" style={{width: "75%"}}>
					<div class="CardItem">
						<div class="CardBodyTextCentered">
							usage till now
						</div>
						<div class="CardBodyTextHighlightCentered">
							{this.state.usage} gallons
						</div>
					</div>
					<div class="CardItem">
						<div class="CardBodyTextCentered">
							current usage
						</div>
						<div class="CardBodyTextHighlightCentered">
							{this.state.flow} gal/min
						</div>
					</div>
				</div>
			</div>
			<HorizBarGraph units="gallons" today={80} yesterday={100} average={60}/>
		</div>
    )
  }
}


export default WaterCard
