import React, { Component } from 'react'
import './dashboard.css'
import '../fonts/material-design-icons/iconfont/material-icons.css'
//import uibuilder from '../../libs/uibuilder/uibuilderfe.js'
import WaterLiveCard from './WaterLiveCard'
import WaterChartCard from './WaterChartCard'
import WaterValveCard from './WaterValveCard'

class WaterFullscreenCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
  	//console.log("WaterFullscreenCard - componentDidMount()")
  	// request historical data
  	//uibuilder.send({'topic':'water','payload':'initialize'})
  }

  shouldComponentUpdate(nextProps){
  	if(nextProps.water == null){
  		//console.log("WaterFullscreenCard:shouldComponentUpdate:return false")
  		return false
  	}
  	//console.log("WaterFullscreenCard:shouldComponentUpdate:return true")
	return true
  }



  render() {
  	//console.log("WaterFullscreenCard.js:render(): ")
  	//console.log(this.props)

  	if (this.props.water == null) {
	    return (
	    	<div class="CardBoardContainer">
				<div class="CardFullwidthContainer">
					<WaterChartCard chartData={undefined}/>
				</div>
				<div class="CardContainer">
					<WaterLiveCard liveInfo={undefined}/>
				</div>
				<div class="MiniCardContainer">
					<WaterValveCard valve={undefined}/>
				</div>
			</div>
	    ) 
	}

    return (
    	<div class="CardBoardContainer">
			<div class="CardFullwidthContainer">
				<WaterChartCard chart={this.props.water.chart}/>
			</div>
			<div class="CardContainer">
				<WaterLiveCard liveInfo={this.props.water.liveInfo}/>
			</div>
			<div class="MiniCardContainer">
				<WaterValveCard valve={this.props.water.valve}/>
			</div>
		</div>
    ) 
  }
}

export default WaterFullscreenCard
