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
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.candy';
// Step 6 - Adding the chart and theme as dependency to the core fusioncharts
import Widgets from "fusioncharts/fusioncharts.widgets"
ReactFC.fcRoot(FusionCharts, Widgets, Column2D, FusionTheme);

// Step 7 - Creating the JSON object to store the chart configurations
/*var chartConfigs = {// The chart type
    width: '700', // Width of the chart
    height: '400', // Height of the chart
    dataFormat: 'json', // Data type
    dataEmptyMessage: "Loading...",
    baseChartMessageFont: "roboto",
    baseChartMessageFontSize: "18",
    baseChartMessageColor: "#FFFFFF",
}*/

var chartConfigs = {
  //todo: get fonts the right size
  id: "stockRealTimeChart",
  type: 'realtimearea',
  //renderAt: 'chart-container',
  width: '1100',
  height: '500',
  dataFormat: 'json',
  dataSource: {
    "chart": {
      "theme": "candy",
      "animation": "0",
      "caption": "Real-time Water Usage",
      //"subCaption": "Harry's SuperMart",
      "xAxisName": "Time (min:sec)",
      "yAxisName": "Flow Rate (gallons/minute)",
      //"numberPrefix": "$",
      //"updateInterval": "0.5",
      "refreshinterval": "0.5",
      //"refreshInstantly": "true",
      //"yaxisminvalue": "5",
      "yaxismaxvalue": "5",
      "numdisplaysets": "120", //2 minutes
      "labelDisplay": "NONE",
      "slantLabels": "1",
      "showRealTimeValue": "0",
      "showPlotBorder": "1",
      "inheritPlotBorderColor": "1",
      //-----cosmetics-------//
      "paletteColors": "#ffc000",
      "bgColor": "#333333",
      "canvasBgColor": "#333333",
      "baseFont": "Roboto",
      "baseFontColor": "#d3d3d3",
      "baseFontSize": "15",
      "outCnvBaseFont": "Roboto",
      "outCnvBaseFontColor": "#d3d3d3",
      "outCnvBaseFontSize": "20",
      "captionFont": "Roboto",
      "yAxisNameFont": "Roboto",
      "yAxisValueFont": "Roboto",
      "xAxisNameFont": "Roboto",
      "captionFontColor": "#d3d3d3",
      "yAxisNameFontColor": "#d3d3d3",
      "yAxisValueFontColor": "#d3d3d3",
      "xAxisNameFontColor": "#d3d3d3",  
      "captionFontSize": "20",
      "yAxisNameFontSize": "20",
      "yAxisValueFontSize": "20",
      "xAxisNameFontSize": "20",          
      "divlineColor": "#d3d3d3",
      "divlineThickness": "1",
      "divLineIsDashed": "1",
      "divLineDashLen": "1",
      "divLineGapLen": "1",
      "showXAxisLine": "1",
      "xAxisLineThickness": "1",
      "xAxisLineColor": "#d3d3d3",
      "showAlternateHGridColor": "0",
      "vDivlineColor": "#d3d3d3",
      "vDivlineThickness": "1",
    },
    "categories": [{
        "category": [{
        "label": ""
      }]
    }],
    "dataset": [{
      "data": [{
        "value": "0"
      }]
    }]
  }
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
  	uibuilder.send({'topic': this.props.topic, 'payload': {chart: {type: this.props.chartType, range: this.props.currentTab, rangeOffset: this.props.rangeOffset, cumulative: this.props.cumulative}}})
  }

  shouldComponentUpdate(nextProps){
    //console.log("ChartCard:shouldComponentUpdate:return true")
  	if(!((nextProps.currentTab === this.props.currentTab) && (nextProps.cumulative === this.props.cumulative) && (nextProps.rangeOffset === this.props.rangeOffset))){
  		uibuilder.send({'topic': this.props.topic,'payload':{chart: {type: this.props.chartType, range: this.props.currentTab, rangeOffset: this.props.rangeOffset, cumulative: this.props.cumulative}}})
      //chartConfigs.dataSource={}
      //console.log("ChartCard:shouldComponentUpdate:return true")
      return true
  	}
    if((nextProps.chartDisplay === this.props.chartDisplay) && (nextProps.chartData == null)){
      //console.log("ChartCard:shouldComponentUpdate:return false")
      return false
    }
    //console.log("ChartCard:shouldComponentUpdate:return true")
	  return true
  }

  render() {
  	//console.log("ChartCard.js:render(): ")
  	//console.log(this.props)

  	if (this.props.chartData == null) {
      //console.log("chartData null render")
      return (
      	<div class="CardBody">
          <ReactFC type={this.props.chartDisplay} {...chartConfigs}/>
        </div>
      ) 
  	}

    //chartConfigs.dataSource=this.props.chartData

    if (this.props.currentTab = "now") {
      var chartRef = FusionCharts("stockRealTimeChart")
      chartRef.feedData(this.props.chartData)
      return (
        <div class="CardBody">
          <ReactFC type={this.props.chartDisplay} {...chartConfigs}/>
        </div>
      )
    }
  }
}

export default ChartCard
