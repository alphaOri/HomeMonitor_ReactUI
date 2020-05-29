import React, { Component } from 'react'
import './dashboard.css'
import '../fonts/material-design-icons/iconfont/material-icons.css'
import CardHeader from './CardHeader'
import uibuilder from '../../libs/uibuilder/uibuilderfe.js'
import TabsHeader from './TabsHeader'
import { CheckBox } from './Buttons.js'
import {SimpleSelect, SimpleTimePicker} from './Selectors.js'

const temperatureRange = 41; //to include 90
const temperatureBase = 50;
var temperatureValues = Array(temperatureRange);
for(let i=0; i<temperatureValues.length; i++){
  temperatureValues[i]=i+temperatureBase;
}

const humidityRange = 11; //25-75
const humidityBase = 25;
var humidityValues = Array(humidityRange);
for(let i=0; i<temperatureValues.length; i++){
  humidityValues[i]=(i*5)+temperatureBase;
}

const co2Range = 25; //300-1500
const co2Base = 300;
var co2Values = Array(co2Range);
for(let i=0; i<temperatureValues.length; i++){
  co2Values[i]=(i*50)+temperatureBase;
}

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
      //previous props - store to compare nextProps to, since state can change props below
      temperatureSettings: null,
      //props
      wakeOn: null,
      wakeSetpoint: null,
      wakeTime: null,
      sleepOn: null,
      sleepSetpoint: null,
      sleepTime: null,
      leaveOn: null,
      leaveSetpoint: null,
      //tab stuff
      tabList: ["heating", "cooling"],
      currentTabIndex: 0,
    }
  }
  
  componentDidMount() {
    //console.log("AirTemperatureSettings - componentDidMount()")
    uibuilder.send({'topic':'air','payload': {temperature: {initialize: "settings", mode: this.state.currentTabIndex}}})
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

  handleTabClick = (text, index) => {
    //console.log("AirTemperatureSettings - handleTabClick()")
    this.setState({
      currentTabIndex: index
    });
    uibuilder.send({'topic':'air','payload': {temperature: {initialize: "settings", mode: index}}})
  }

  handleButtonClick = (value, buttonId) => {
    //console.log("AirTemperatureSettings - handleWakeSetpointSelect(): ")
    //console.log("value: "+ value + " selectorId: " + selectorId);
    this.setState({[buttonId]: value});
    uibuilder.send({'topic':'air','payload': {temperature: {settings: {[buttonId]: value, mode: this.state.currentTabIndex}}}})
  }

  render() {
  	console.log("AirTemperatureSettings.js:render(): ")
  	console.log(this.props)
    console.log(this.state)

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
        <div class="TabContainer">
            <TabsHeader tabList={this.state.tabList} currentTabIndex={this.state.currentTabIndex} tabClickHandler={this.handleTabClick} 
              defaultColor="var(--card-background-color)" highlightColor="var(--card-highlight-color)"/>
            <div class="TabBody" style={{height: "250px"}}>
                <div class="CardItems" style={{width: "82%"}}>
                    <div class="CardItem">
                        <div class="RowGroup">
                            <CheckBox checked={this.state.wakeOn} buttonClickHandler={this.handleButtonClick} buttonId="wakeOn"/>
                            <div class="CardBodyText" style={{marginLeft: "28px"}}>
                                 wake
                            </div>
                        </div>
                        <div class="RowGroup">
                            <div class="CardBodyText" style={{margin: "8px"}}>
                                 set to
                            </div>
                            <SimpleSelect key={String(this.state.temperatureSettings.wakeSetpoint)} disabled={!this.state.wakeOn} values={temperatureValues} initValue={this.state.temperatureSettings.wakeSetpoint} 
                                offset={temperatureBase} units={"°"} handleSelect={this.handleButtonClick} buttonId="wakeSetpoint"/> {/*we use temperatureSettings in key because it will not be changed unless new props come in*/}
                            <div class="CardBodyText" style={{margin: "8px"}}>
                                 at
                            </div>
                            <SimpleTimePicker key={String(this.state.temperatureSettings.wakeTime)} disabled={!this.state.wakeOn} initValue={this.state.temperatureSettings.wakeTime}
                                handleSelect={this.handleButtonClick} buttonId="wakeTime"/>
                        </div>
                    </div>
                    <div class="CardItem">
                        <div class="RowGroup">
                            <CheckBox checked={this.state.sleepOn} buttonClickHandler={this.handleButtonClick} buttonId="sleepOn"/>
                            <div class="CardBodyText" style={{marginLeft: "28px"}}>
                                 sleep
                            </div>
                        </div>
                        <div class="RowGroup">
                            <div class="CardBodyText" style={{margin: "8px"}}>
                                 set to
                            </div>
                            <SimpleSelect key={String(this.state.temperatureSettings.sleepSetpoint)} disabled={!this.state.sleepOn} values={temperatureValues} initValue={this.state.temperatureSettings.sleepSetpoint} 
                                offset={temperatureBase} units={"°"} handleSelect={this.handleButtonClick} buttonId="sleepSetpoint"/> {/*we use temperatureSettings in key because it will not be changed unless new props come in*/}
                            <div class="CardBodyText" style={{margin: "8px"}}>
                                 at
                            </div>
                            <SimpleTimePicker key={String(this.state.temperatureSettings.sleepTime)} disabled={!this.state.sleepOn} initValue={this.state.temperatureSettings.sleepTime}
                                handleSelect={this.handleButtonClick} buttonId="sleepTime"/>
                        </div>
                    </div>
                    <div class="CardItem">
                        <div class="RowGroup">
                            <CheckBox checked={this.state.leaveOn} buttonClickHandler={this.handleButtonClick} buttonId="leaveOn"/>
                            <div class="CardBodyText" style={{margin: "0px 8px 0px 28px"}}>
                                 in leave mode, set to
                            </div>
                            <SimpleSelect key={String(this.state.temperatureSettings.leaveSetpoint)} disabled={!this.state.leaveOn} values={temperatureValues} initValue={this.state.temperatureSettings.leaveSetpoint}
                              offset={temperatureBase} units={"°"} handleSelect={this.handleButtonClick} buttonId="leaveSetpoint"/>
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
