import React, { Component } from 'react'
import './dashboard.css'
import '../fonts/material-design-icons/iconfont/material-icons.css'
import HorizBarGraph from './HorizBarGraph'
import SourceLabels from './SourceLabels'
import uibuilder from '../../libs/uibuilder/uibuilderfe.js'
import {DisplayValueSeparateUnits} from './DisplayValue.js'

class WaterLiveCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
  	//console.log("WaterLiveCard - componentDidMount()")
  	// request historical data
  	uibuilder.send({'topic':'water','payload': {liveCard: 'initialize'}})
  }

  shouldComponentUpdate(nextProps){
  	if(nextProps.liveInfo == null){
  		//console.log("WaterLiveCard:shouldComponentUpdate:return false")
  		return false
  	}
  	//console.log("WaterLiveCard:shouldComponentUpdate:return true")
	return true
  }

  render() {
  	//console.log("WaterLiveCard.js:render(): ")
  	//console.log(this.props)

	if (this.props.liveInfo == null) {
	    return (
			<div class="CardBody" style={{height: "300px"}}>
				<div class="CardItems" style={{width: "75%"}}>
					<div class="CardItem">
						<div class="CardBodyTextCentered">
							Connecting...
						</div>
					</div>
				</div>
			</div>
	    ) 
	}

    return (
		<div class="CardBody" style={{height: "300px"}}>
			<div class="CardItems" style={{width: "55%"}}>
				<div class="CardItem">
					<div class="CardBodyTextCentered">
						so far today
					</div>
					<div class="CardBodyTextHighlightCentered">
						<DisplayValueSeparateUnits value={this.props.liveInfo.usage} units={"gallons"}/>
					</div>
				</div>
				<div class="CardItem">
					<div class="CardBodyTextCentered">
						current usage
					</div>
					<div class="CardBodyTextHighlightCentered">
						<DisplayValueSeparateUnits value={this.props.liveInfo.flow} units={"gal/min"}/>
					</div>
				</div>
			</div>
			<SourceLabels sources={this.props.liveInfo.sources}/>
			<HorizBarGraph units="gallons" totals={this.props.liveInfo.totals}/>
		</div>
    )
  }
}

export default WaterLiveCard
