import React, { Component } from 'react'
import './dashboard.css'
import '../fonts/material-design-icons/iconfont/material-icons.css'
import HorizBarGraph from './HorizBarGraph'
import SourceLabels from './SourceLabels'
import CardHeader from './CardHeader'
import uibuilder from '../../libs/uibuilder/uibuilderfe.js'
import DisplayValue from './LittleBits.js'

class WaterCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
  	//console.log("WaterCard - componentDidMount()")
  	// request historical data
  	uibuilder.send({'topic':'water','payload':'initialize'})
  }

  shouldComponentUpdate(nextProps){
  	if(nextProps.water == null){
  		//console.log("WaterCard:shouldComponentUpdate:return false")
  		return false
  	}
  	//console.log("WaterCard:shouldComponentUpdate:return true")
	return true
  }

  render() {
  	//console.log("WaterCard.js:render(): ")
  	//console.log(this.props)

	if (this.props.water == null) {
	    return (
			<div class="CardContainer">
				<CardHeader title="Water"/>
				<div class="CardBody">
					<div class="CardItems" style={{width: "75%"}}>
						<div class="CardItem">
							<div class="CardBodyTextCentered">
								No Data...
							</div>
						</div>
					</div>
				</div>
			</div>
	    ) 
	}

    return (
		<div class="CardContainer">
			<CardHeader title="Water" 
				fullscreenClick={this.props.fullscreenClick} type="water"/>
			<div class="CardBody">
				<div class="CardItems" style={{width: "65%"}}>
					<div class="CardItem">
						<div class="CardBodyTextCentered">
							so far today
						</div>
						<DisplayValue value={this.props.water.usage} units={"gallons"}/>
					</div>
					<div class="CardItem">
						<div class="CardBodyTextCentered">
							current usage
						</div>
						<DisplayValue value={this.props.water.flow} units={"gal/min"}/>
					</div>
				</div>
				<SourceLabels sources={this.props.water.sources}/>
				<HorizBarGraph units="gallons" totals={this.props.water.totals}/>
			</div>
		</div>
    )
  }
}




export default WaterCard
