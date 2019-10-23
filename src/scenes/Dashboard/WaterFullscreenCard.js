import React, { Component } from 'react'
import './dashboard.css'
import '../fonts/material-design-icons/iconfont/material-icons.css'
import HorizBarGraph from './HorizBarGraph'
import SourceLabels from './SourceLabels'
import CardHeader from './CardHeader'
import uibuilder from '../../libs/uibuilder/uibuilderfe.js'
import DisplayValue from './LittleBits.js'
import WaterLiveCard from './WaterLiveCard'
import TabsHeader from './TabsHeader'

// Step 1 - Include react
//import ReactDOM from 'react-dom';

// Step 2 - Include the react-fusioncharts component
import ReactFC from 'react-fusioncharts';

// Step 3 - Include the fusioncharts library
import FusionCharts from 'fusioncharts';

// Step 4 - Include the chart type
import Column2D from 'fusioncharts/fusioncharts.charts';

// Step 5 - Include the theme as fusion
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

// Step 6 - Adding the chart and theme as dependency to the core fusioncharts
//ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

const chartTabList = ["now", "day", "week", "month", "year"];

class WaterFullscreenCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
    	currentTab: "now"
    }
  }

   handleTabClick = (text) => {
  	this.setState({
	  currentTab: text
	});
  }

  componentDidMount() {
  	//console.log("WaterFullscreenCard - componentDidMount()")
  	// request historical data
  	uibuilder.send({'topic':'water','payload':'initialize'})
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
					<TabsHeader tabList={chartTabList} currentTab={this.state.currentTab} tabClickHandler={this.handleTabClick}/>
					<div class="CardBody">
						<div id="chart-container">Chart loading...</div>
					</div>
				</div>
				<div class="CardContainer">
					<WaterLiveCard liveInfo={undefined}/>
				</div>
			</div>
	    ) 
	}

    return (
    	<div class="CardBoardContainer">
			<div class="CardFullwidthContainer">
				<TabsHeader tabList={chartTabList} currentTab={this.state.currentTab} tabClickHandler={this.handleTabClick}/>
				<div class="CardBody">
					<div id="chart-container">Chart loading...</div>
				</div>
			</div>
			<div class="CardContainer">
				<WaterLiveCard liveInfo={this.props.water.liveInfo}/>
			</div>
		</div>
    ) 
  }
}

export default WaterFullscreenCard
