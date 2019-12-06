import React, { Component } from 'react'
import './dashboard.css'
import '../fonts/material-design-icons/iconfont/material-icons.css'
import uibuilder from '../../libs/uibuilder/uibuilderfe.js'
// Step 2 - Include the react-fusioncharts component
import ReactFC from 'react-fusioncharts';
// Step 3 - Include the fusioncharts library
import FusionCharts from 'fusioncharts';
// Step 4 - Include the chart type
import Column2D from 'fusioncharts/fusioncharts.charts';
// Step 5 - Include the theme as fusion
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
// Step 6 - Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

// Step 7 - Creating the JSON object to store the chart configurations
var chartConfigs = {// The chart type
    width: '700', // Width of the chart
    height: '400', // Height of the chart
    dataFormat: 'json', // Data type
    dataEmptyMessage: "Loading...",
    baseChartMessageFont: "roboto",
    baseChartMessageFontSize: "18",
    baseChartMessageColor: "#FFFFFF",
}

class ChartCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
  	//console.log("ChartCard - componentDidMount()")
  	// request historical data
  	uibuilder.send({'topic':'water','payload':{chart: {type: this.props.chartType, range: this.props.currentTab, rangeOffset: this.props.rangeOffset, cumulative: this.props.cumulative}}})
  }

  shouldComponentUpdate(nextProps){
  	if(!((nextProps.currentTab === this.props.currentTab) && (nextProps.cumulative === this.props.cumulative) && (nextProps.rangeOffset === this.props.rangeOffset))){
  		uibuilder.send({'topic':'water','payload':{chart: {type: this.props.chartType, range: this.props.currentTab, rangeOffset: this.props.rangeOffset, cumulative: this.props.cumulative}}})
      chartConfigs.dataSource={}
      return true
  	}
    if((nextProps.chartDisplay === this.props.chartDisplay) && (nextProps.chartData == null)){
      return false
    }
  	//console.log("ChartCard:shouldComponentUpdate:return true")
	  return true
  }

  render() {
  	//console.log("ChartCard.js:render(): ")
  	//console.log(this.props)

  	if (this.props.chartData == null) {
      return (
      	<div class="CardBody">
          <ReactFC type={this.props.chartDisplay} {...chartConfigs}/>
        </div>
      ) 
  	}

    chartConfigs.dataSource=this.props.chartData

    return (
      <div class="CardBody">
        <ReactFC type={this.props.chartDisplay} {...chartConfigs}/>
      </div>
    )
  }
}

export default ChartCard
