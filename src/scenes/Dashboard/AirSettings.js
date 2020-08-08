import React, { Component } from 'react'
import './dashboard.css'
import '../fonts/material-design-icons/iconfont/material-icons.css'
import CardHeader from './CardHeader'
import uibuilder from '../../libs/uibuilder/uibuilderfe.js'
import TabsHeader from './TabsHeader'
import { CheckBox } from './Buttons.js'
import {SimpleSelect, SimpleTimePicker} from './Selectors.js'
import {RectangularButton} from './Buttons.js'

const temperatureRange = 41; //to include 90
const temperatureBase = 50;
var temperatureValues = Array(temperatureRange);
for(let i=0; i<temperatureValues.length; i++){
  temperatureValues[i]=i+temperatureBase;
}

const humidityRange = 11; //25-75
const humidityBase = 25;
var humidityValues = Array(humidityRange);
for(let i=0; i<humidityValues.length; i++){
  humidityValues[i]=(i*5)+humidityBase;
}

const ventilationRange = 15; //300-1500
const ventilationBase = 1;
var ventilationValues = Array(ventilationRange);
for(let i=0; i<ventilationValues.length; i++){
  ventilationValues[i]=i+ventilationBase;
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

export class AirTemperatureSettings extends Component {
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
    uibuilder.send({'topic':'air','payload': {temperature: {initialize: "settings", index: this.state.currentTabIndex}}})
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
    uibuilder.send({'topic':'air','payload': {temperature: {initialize: "settings", index: index}}})
  }

  handleButtonClick = (value, buttonId) => {
    //console.log("AirTemperatureSettings - handleButtonClick(): ")
    //console.log("value: "+ value + " buttonId: " + buttonId);
    this.setState({[buttonId]: value});
    uibuilder.send({'topic':'air','payload': {temperature: {settings: {[buttonId]: value, index: this.state.currentTabIndex}}}})
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
                            <div class="CardBodyText" style={{marginLeft: "20px"}}>
                                 wake
                            </div>
                        </div>
                        <div class="RowGroup">
                            <div class="CardBodyText" style={{margin: "8px"}}>
                                 set to
                            </div>
                            <SimpleSelect key={String(this.state.temperatureSettings.wakeSetpoint)} values={temperatureValues} initValue={this.state.temperatureSettings.wakeSetpoint} 
                                units={"°"} handleSelect={this.handleButtonClick} buttonId="wakeSetpoint"/> {/*we use temperatureSettings in key because it will not be changed unless new props come in*/}
                            <div class="CardBodyText" style={{margin: "8px"}}>
                                 at
                            </div>
                            <SimpleTimePicker key={String(this.state.temperatureSettings.wakeTime)} initValue={this.state.temperatureSettings.wakeTime}
                                handleSelect={this.handleButtonClick} buttonId="wakeTime"/>
                        </div>
                    </div>
                    <div class="CardItem">
                        <div class="RowGroup">
                            <CheckBox checked={this.state.sleepOn} buttonClickHandler={this.handleButtonClick} buttonId="sleepOn"/>
                            <div class="CardBodyText" style={{marginLeft: "20px"}}>
                                 sleep
                            </div>
                        </div>
                        <div class="RowGroup">
                            <div class="CardBodyText" style={{margin: "8px"}}>
                                 set to
                            </div>
                            <SimpleSelect key={String(this.state.temperatureSettings.sleepSetpoint)} values={temperatureValues} initValue={this.state.temperatureSettings.sleepSetpoint} 
                                units={"°"} handleSelect={this.handleButtonClick} buttonId="sleepSetpoint"/> {/*we use temperatureSettings in key because it will not be changed unless new props come in*/}
                            <div class="CardBodyText" style={{margin: "8px"}}>
                                 at
                            </div>
                            <SimpleTimePicker key={String(this.state.temperatureSettings.sleepTime)} initValue={this.state.temperatureSettings.sleepTime}
                                handleSelect={this.handleButtonClick} buttonId="sleepTime"/>
                        </div>
                    </div>
                    <div class="CardItem">
                        <div class="RowGroup">
                            <CheckBox checked={this.state.leaveOn} buttonClickHandler={this.handleButtonClick} buttonId="leaveOn"/>
                            <div class="CardBodyText" style={{margin: "0px 8px 0px 20px"}}>
                                 in leave mode, set to
                            </div>
                            <SimpleSelect key={String(this.state.temperatureSettings.leaveSetpoint)} values={temperatureValues} initValue={this.state.temperatureSettings.leaveSetpoint}
                              units={"°"} handleSelect={this.handleButtonClick} buttonId="leaveSetpoint"/>
                        </div>
                    </div>
                </div>
            </div>
          </div>
  		</div>
    )
  }
}

export class AirHumiditySettings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      //previous props - store to compare nextProps to, since state can change props below
      humiditySettings: null,
      //props
      leaveOn: null,
      leaveSetpoint: null,
      //tab stuff
      tabList: ["humidify", "dehumidify"],
      currentTabIndex: 0,
    }
  }
  
  componentDidMount() {
    //console.log("AirHumiditySettings - componentDidMount()")
    uibuilder.send({'topic':'air','payload': {humidity: {initialize: "settings", index: this.state.currentTabIndex}}})
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.humiditySettings == null || samePropsAreInState(prevState, nextProps)) { //test edge case, state is changed, but props are still valid so they override the state change.
      console.log('AirHumiditySettings:getDerivedStateFromProps:return null')
      return null;
    }
    console.log('AirHumiditySettings:getDerivedStateFromProps:return ', nextProps.humiditySettings)
    return {humiditySettings: nextProps.humiditySettings, ...nextProps.humiditySettings};
  }

  shouldComponentUpdate(nextProps, nextState){
    if((this.state == nextState)){ //since we derive state from props, this check is sufficient - no need to check props
      console.log("AirHumiditySettings:shouldComponentUpdate:return false")
      return false
    }
    console.log("AirHumiditySettings:shouldComponentUpdate:return true")
    return true
  }

  handleTabClick = (text, index) => {
    //console.log("AirHumiditySettings - handleTabClick()")
    this.setState({
      currentTabIndex: index
    });
    uibuilder.send({'topic':'air','payload': {humidity: {initialize: "settings", index: index}}})
  }

  handleButtonClick = (value, buttonId) => {
    //console.log("AirHumiditySettings - handleButtonClick(): ")
    //console.log("value: "+ value + " buttonId: " + buttonId);
    this.setState({[buttonId]: value});
    uibuilder.send({'topic':'air','payload': {humidity: {settings: {[buttonId]: value, index: this.state.currentTabIndex}}}})
  }

  render() {
    console.log("AirHumiditySettings.js:render(): ")
    console.log(this.props)
    console.log(this.state)

    if(this.state.humiditySettings == null){
      return (
        <div class="CardContainer" style={{height: "378px"}}>
          <CardHeader title="Humidity (Connecting....)"/>
        </div>
      )
    }

    return (
      <div class="CardContainer" style={{height: "378px"}}>
        <CardHeader title="Humidity"/>
        <div class="TabContainer">
            <TabsHeader tabList={this.state.tabList} currentTabIndex={this.state.currentTabIndex} tabClickHandler={this.handleTabClick} 
              defaultColor="var(--card-background-color)" highlightColor="var(--card-highlight-color)"/>
            <div class="TabBody" style={{height: "250px"}}>
                <div class="CardItems" style={{width: "82%"}}>
                    <div class="CardItem">
                        <div class="RowGroup">
                            <CheckBox checked={this.state.leaveOn} buttonClickHandler={this.handleButtonClick} buttonId="leaveOn"/>
                            <div class="CardBodyText" style={{margin: "0px 8px 0px 20px"}}>
                                 in leave mode, set to
                            </div>
                            <SimpleSelect key={String(this.state.humiditySettings.leaveSetpoint)} values={humidityValues} initValue={this.state.humiditySettings.leaveSetpoint}
                              units={"%"} handleSelect={this.handleButtonClick} buttonId="leaveSetpoint"/>
                        </div>
                    </div>
                </div>
            </div>
          </div>
      </div>
    )
  }
}

export class AirVentilationSettings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      //previous props - store to compare nextProps to, since state can change props below
      ventilationSettings: null,
      //props
      offHoursOn: null,
      offHoursStartTime: null,
      offHoursEndTime: null,
      temperatureAssistOn: null,
      temperatureAssistLimit: null,
      calibrationDaysAgo: null,
    }
  }
  
  componentDidMount() {
    //console.log("AirVentilationSettings - componentDidMount()")
    uibuilder.send({'topic':'air','payload': {ventilation: {initialize: "settings"}}})
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.ventilationSettings == null || samePropsAreInState(prevState, nextProps)) { //test edge case, state is changed, but props are still valid so they override the state change.
      console.log('AirVentilationSettings:getDerivedStateFromProps:return null')
      return null;
    }
    console.log('AirVentilationSettings:getDerivedStateFromProps:return ', nextProps.ventilationSettings)
    return {ventilationSettings: nextProps.ventilationSettings, ...nextProps.ventilationSettings};
  }

  shouldComponentUpdate(nextProps, nextState){
    if((this.state == nextState)){ //since we derive state from props, this check is sufficient - no need to check props
      console.log("AirVentilationSettings:shouldComponentUpdate:return false")
      return false
    }
    console.log("AirVentilationSettings:shouldComponentUpdate:return true")
    return true
  }

  handleButtonClick = (value, buttonId) => {
    //console.log("AirVentilationSettings - handleButtonClick(): ")
    //console.log("value: "+ value + " buttonId: " + buttonId);
    this.setState({[buttonId]: value});
    uibuilder.send({'topic':'air','payload': {ventilation: {settings: {[buttonId]: value}}}})
  }

  handleCalibrateButtonClick = (text) => {
    //console.log("AirVentilationSettings - handleCalibrateButtonClick(): ")
    uibuilder.send({'topic':'air','payload': {ventilation: {calibrate: "calibrate"}}})
  }

  render() {
    console.log("AirVentilationSettings.js:render(): ")
    console.log(this.props)
    console.log(this.state)

    if(this.state.ventilationSettings == null){
      return (
        <div class="CardContainer" style={{height: "378px"}}>
          <CardHeader title="Ventilation (Connecting....)"/>
        </div>
      )
    }

    return (
      <div class="CardContainer" style={{height: "378px"}}>
        <CardHeader title="Ventilation"/>
        <div class="CardBody" style={{height: "300px"}}>
            <div class="CardItems" style={{width: "82%"}}>
              <div class="CardItem">
                  <div class="RowGroup">
                      <CheckBox checked={this.state.offHoursOn} buttonClickHandler={this.handleButtonClick} buttonId="offHoursOn"/>
                      <div class="CardBodyText" style={{margin: "0px 8px 0px 20px"}}>
                          keep off between
                      </div>
                      <SimpleTimePicker key={String(this.state.ventilationSettings.offHoursStartTime)} initValue={this.state.ventilationSettings.offHoursStartTime}
                          handleSelect={this.handleButtonClick} buttonId="offHoursStartTime" timeFormat="h a" minutesStep={60} width={82}/>
                      <div class="CardBodyText" style={{margin: "8px"}}>
                           and
                      </div>
                      <SimpleTimePicker key={String(this.state.ventilationSettings.offHoursEndTime)} initValue={this.state.ventilationSettings.offHoursEndTime}
                          handleSelect={this.handleButtonClick} buttonId="offHoursEndTime" timeFormat="h a" minutesStep={60} width={82}/>
                  </div>
              </div>
              <div class="CardItem">
                  <div class="RowGroup">
                      <CheckBox checked={this.state.temperatureAssistOn} buttonClickHandler={this.handleButtonClick} buttonId="temperatureAssistOn"/>
                        <div style={{margin: "0px 8px 0px 20px", display: "flex", flexDirection: "column"}}>
                          <div class="CardBodyText" >
                               use outside air to cool/heat.
                          </div>
                          <div class="CardBodyText" style={{textAlign: "right"}}>
                               limit to temperature setpoint +/-
                          </div>
                        </div>
                      <SimpleSelect key={String(this.state.ventilationSettings.temperatureAssistLimit)} values={ventilationValues} initValue={this.state.ventilationSettings.temperatureAssistLimit} 
                          units={"°"} handleSelect={this.handleButtonClick} buttonId="temperatureAssistLimit"/>
                  </div>
              </div>
              <div class="CardItem">
                  <div class="RowGroup">
                      <div class="CardBodyText" >
                           Last calibration was {this.state.ventilationSettings.calibrationDaysAgo} days ago.
                      </div>
                  </div>
                  <div class="RowGroup">
                    <RectangularButton text="Calibrate" buttonClickHandler={this.handleCalibrateButtonClick}/>
                  </div>
              </div>
            </div>
          </div>
      </div>
    )
  }
}
