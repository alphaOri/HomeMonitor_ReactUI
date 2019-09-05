import React, { Component } from 'react'
import './dashboard.css'
import '../fonts/material-design-icons/iconfont/material-icons.css'
import HorizBarGraph from './HorizBarGraph'
import CardHeader from './CardHeader'
import uibuilder from '../../libs/uibuilder/uibuilderfe.js'
import DisplayValue from './LittleBits.js'

class WaterCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
    	usage: 0,
    	flow: 0
    }
  }

  componentDidMount() {
  	//console.log("WaterCard - componentDidMount()")
  	// request historical data
  	uibuilder.send({'topic':'water','payload':'initialize'})
  }

  render() {
  	if(this.props.waterData){
		if(this.props.waterData.usage !== undefined && (this.state.usage !== this.props.waterData.usage)){
	  		this.setState((state, props) => ({
			  usage: this.props.waterData.usage
			}))
	    }
	    else if(this.props.waterData.flow !== undefined && (this.state.flow !== this.props.waterData.flow)){
			this.setState((state, props) => ({
			  flow: this.props.waterData.flow
			}))
	    }
	}

    return (
		<div class="CardContainer">
			<CardHeader title="Water"/>
			<div class="CardBody">
				<div class="CardItems" style={{width: "75%"}}>
					<div class="CardItem">
						<div class="CardBodyTextCentered">
							usage till now
						</div>
						<DisplayValue value={this.state.usage} units={"gallons"}/>
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
