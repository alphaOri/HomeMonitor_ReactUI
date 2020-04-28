import React, { Component } from 'react'
import './dashboard.css'
import '../fonts/material-design-icons/iconfont/material-icons.css'
import CardHeader from './CardHeader'
import uibuilder from '../../libs/uibuilder/uibuilderfe.js'
import TabsHeader from './TabsHeader'

function samePropsAreInState(state, props){
  for (var key in props) {
    var val = props[key];
    console.log(key + ": " + val);
    if (state.hasOwnProperty(key) && state[key] !== null) {
      if (typeof val === 'object' && val !== null) {
        if(!samePropsAreInState(state[key], val)){
          return false;
        }
      } else {
        console.log("state[key]: "+ state[key] + " props[key]: " + props[key]);
        if(state[key] !== props[key]){
          return false;
        }
      }
    } else {
      console.log("state[key]: " + state[key]);
      return false;
    }
  }
  return true;
}

class AirTemperatureSettings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      //previous props
      temperatureSettings: null,
      //props
      heatingWakeOn: null,
      heatingWakeSepoint: null,
      heatingWakeTime: null,
      heatingSleepOn: null,
      heatingSleepSetpoint: null,
      heatingSleepTime: null,
      heatingLeaveOn: null,
      heatingLeaveSetpoint: null,
      coolingWakeOn: null,
      coolingWakeSetpoint: null,
      coolingWakeTime: null,
      coolingSleepOn: null,
      coolingSleepSetpoint: null,
      coolingSleepTime: null,
      coolingLeaveOn: null,
      coolingLeaveSetpoint: null,
      //
      tabList: ["heating", "cooling"],
      currentTab: "heating",
    }
  }
  
  componentDidMount() {
    //console.log("AirTemperatureSettings - componentDidMount()")
    uibuilder.send({'topic':'air','payload': {temperature: {initialize: "settings"}}})
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.temperatureSettings == null || samePropsAreInState(prevState, nextProps)) { //test edge case, state is changed, but props are still valid so they override the state change.
      console.log('AirTemperatureSettings:getDerivedStateFromProps:return null')
      return null;
    }
    console.log('AirTemperatureSettings:getDerivedStateFromProps:return ', nextProps.temperatureSettings)
    return {temperatureSettings: nextProps.temperatureSettings, ...nextProps.temperatureSettings};
  }

  shouldComponentUpdate(nextProps, nextState){
    if((this.state == nextState)){ //since we derive state from props, this check is sufficient - no need to check props
      console.log("AirTemperatureSettings:shouldComponentUpdate:return false")
      return false
    }
    console.log("AirTemperatureSettings:shouldComponentUpdate:return true")
    return true
  }

  handleTabClick = (text) => {
      //console.log("WaterChartCard - handleTabClick()")
      this.setState({
      currentTab: text
    });
  }

  render() {
  	console.log("AirTemperatureSettings.js:render(): ")
  	console.log(this.props)

    if(this.state.temperatureSettings == null){
      return (
        <div class="CardContainer" style={{height: "378px"}}>
          <CardHeader title="Temperature (Connecting....)"/>
        </div>
      )
    }

    return (
  		<div class="CardContainer" style={{height: "378px"}}>
  			<CardHeader title="Temperature"/>
        <div class="TabContainer" style={{height: "300px"}}>
            <TabsHeader tabList={this.state.tabList} currentTab={this.state.currentTab} tabClickHandler={this.handleTabClick} 
              defaultColor="var(--card-background-color)" highlightColor="var(--card-highlight-color)"/>
            <div class="TabBody">
                <div class="CardItems" style={{width: "82%"}}>
                    <div class="CardItem">
                        <div class="RowGroup">
                            <div class="CheckBox">
                                <i class="material-icons md-42">done</i>
                            </div>
                            <div class="CardBodyText" style={{marginLeft: "28px"}}>
                                 wake
                            </div>
                        </div>
                        <div class="RowGroup">
                            <div class="CardBodyText" style={{margin: "8px"}}>
                                 set to
                            </div>
                            <div class="RectangleButton" style={{borderRadius: "4px"}}>
                                <div class="ValueDisplay">
                                    62°
                                </div>
                            </div>
                            <div class="CardBodyText" style={{margin: "8px"}}>
                                 at
                            </div>
                            <div class="RectangleButton" style={{borderRadius: "4px", width: "110px"}}>
                                <div class="ValueDisplay">
                                    12:00
                                    <div class="CardBodyUnits">
                                         am
                                    </div> 
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="CardItem">
                        <div class="RowGroup">
                            <div class="CheckBox">
                                <i class="material-icons md-42">done</i>
                            </div>
                            <div class="CardBodyText" style={{marginLeft: "28px"}}>
                                 sleep
                            </div>
                        </div>
                        <div class="RowGroup">
                            <div class="CardBodyText" style={{margin: "8px"}}>
                                 set to
                            </div>
                            <div class="RectangleButton" style={{borderRadius: "4px"}}>
                                <div class="ValueDisplay">
                                    68°
                                </div>
                            </div>
                            <div class="CardBodyText" style={{margin: "8px"}}>
                                 at
                            </div>
                            <div class="RectangleButton" style={{borderRadius: "4px", width: "110px"}}>
                                <div class="ValueDisplay">
                                    12:30
                                    <div class="CardBodyUnits">
                                         pm
                                    </div> 
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="CardItem">
                        <div class="RowGroup">
                            <div class="CheckBox">
                                <i class="material-icons md-42">done</i>
                            </div>
                            <div class="CardBodyText" style={{margin: "0px 8px 0px 28px"}}>
                                 in leave mode, set to
                            </div>
                            <div class="RectangleButton" style={{borderRadius: "4px"}}>
                                <div class="ValueDisplay">
                                    68°
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
  		</div>
    )
  }
}

export default AirTemperatureSettings
