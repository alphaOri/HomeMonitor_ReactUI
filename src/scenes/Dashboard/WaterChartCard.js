import React, { Component } from 'react'
import './dashboard.css'
import '../fonts/material-design-icons/iconfont/material-icons.css'
//import uibuilder from '../../libs/uibuilder/uibuilderfe.js'
import TabsHeader from './TabsHeader'
import ChartCard from './ChartCard'

const chartTabList = ["now", "day", "week", "month", "year"];

class WaterChartCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
    	stackedChart: {
    		chartDisplay: "stackedarea2d",
    		cumulative: false
    	},
    	currentTab: "now",
    	offset: 0
    }
  }

  handleTabClick = (text) => {
  	//console.log("WaterChartCard - handleTabClick()")
  	this.setState({
	  currentTab: text
	});
  }

  handleDisplayTypeClick = (text) => {
  	//console.log("WaterChartCard - handleTabClick()")
  	this.setState({
	  stackedChart.chartDisplay: text
	});
  }

  componentDidMount() {
  	//console.log("WaterChartCard - componentDidMount()")
  	// request historical data
  	//uibuilder.send({'topic':'water','payload':{chart: this.state.currentTab}})
  }

  shouldComponentUpdate(nextProps, nextState){
  	if((nextProps.chart == null) && (this.state === nextState)){
  		console.log("WaterChartCard:shouldComponentUpdate:return false")
  		return false
  	}
  	console.log("WaterChartCard:shouldComponentUpdate:return true")
	return true
  }

  render() {
  	//console.log("WaterChartCard.js:render(): ")
  	//console.log(this.props)

	if (this.props.chart == null) {
    return (
    	<React.Fragment>
	    	<TabsHeader tabList={chartTabList} currentTab={this.state.currentTab} tabClickHandler={this.handleTabClick} 
				defaultColor='var(--main-background-color)' highlightColor='var(--card-background-color)'/>
			<ChartCard topic="water" cumulative={this.state.stackedChart.cumulative} chartDisplay={this.state.stackedChart.chartDisplay} 
				rangeOffset={this.state.offset} chartType="stacked" chartData={undefined} currentTab={this.state.currentTab}/>
		</React.Fragment>
    ) 
	}

    return (
    	<React.Fragment>
	    	<TabsHeader tabList={chartTabList} currentTab={this.state.currentTab} tabClickHandler={this.handleTabClick} 
				defaultColor='var(--main-background-color)' highlightColor='var(--card-background-color)'/>
			<ChartCard topic="water" cumulative={this.state.stackedChart.cumulative} chartDisplay={this.state.stackedChart.chartDisplay} 
				rangeOffset={this.state.offset} chartType="stacked" chartData={this.props.chart.stackedData} currentTab={this.state.currentTab}/>
		</React.Fragment>
    )
  }
}

export default WaterChartCard
