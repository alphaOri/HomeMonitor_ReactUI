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
  id: "stockRealTimeChart",
      type: 'realtimearea',
      renderAt: 'chart-container',
      width: '700',
      height: '400',
      dataFormat: 'json',
      dataSource: {
        "chart": {
          "theme": "fusion",
          "caption": "Real-time stock price monitor",
          "subCaption": "Harry's SuperMart",
          "xAxisName": "Time",
          "yAxisName": "Stock Price",
          "numberPrefix": "$",
          "refreshinterval": "5",
          "yaxisminvalue": "35",
          "yaxismaxvalue": "36",
          "numdisplaysets": "10",
          "labeldisplay": "rotate",
          "showRealTimeValue": "0"

        },
        "categories": [{
          "category": [{
            "label": "Day Start"
          }]
        }],
        "dataset": [{
          "data": [{
            "value": "35.27"
          }]
        }]
      },
      "events": {
        "initialized": function(e) {
          function addLeadingZero(num) {
            return (num <= 9) ? ("0" + num) : num;
          }

          function updateData() {
            // Get reference to the chart using its ID
            var chartRef = FusionCharts("stockRealTimeChart"),
              // We need to create a querystring format incremental update, containing
              // label in hh:mm:ss format
              // and a value (random).
              currDate = new Date(),
              label = addLeadingZero(currDate.getHours()) + ":" +
              addLeadingZero(currDate.getMinutes()) + ":" +
              addLeadingZero(currDate.getSeconds()),
              // Get random number between 35.25 & 35.75 - rounded to 2 decimal places
              randomValue = Math.floor(Math.random() *
                50) / 100 + 35.25,
              // Build Data String in format &label=...&value=...
              strData = "&label=" + label +
              "&value=" +
              randomValue;
            // Feed it to chart.
            chartRef.feedData(strData);
          }

          var myVar = setInterval(function() {
            updateData();
          }, 5000);
        }
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
      return true
  	}
    if((nextProps.chartDisplay === this.props.chartDisplay) && (nextProps.chartData == null)){
      return false
    }
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

    //chartConfigs.dataSource=this.props.chartData

    return (
      <div class="CardBody">
        <ReactFC type={this.props.chartDisplay} {...chartConfigs}/>
      </div>
    )
  }
}

export default ChartCard
