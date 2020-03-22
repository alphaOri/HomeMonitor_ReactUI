import React, { Component } from 'react'
import './dashboard.css'
import '../fonts/material-design-icons/iconfont/material-icons.css'
import '../fonts/icomoon/style.css'
import uibuilder from '../../libs/uibuilder/uibuilderfe.js'
import { DisplayValueAndUnits, DisplayValueSeparateUnits, DisplayColumn } from './DisplayValue.js'
import { CircularButton, CircleTrim, SquareButton } from './Buttons.js'

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

class AirLiveCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  shouldComponentUpdate(nextProps){
    if(nextProps.liveData == null){
      console.log("AirLiveCard:shouldComponentUpdate:return false")
      return false
    }
    console.log("AirLiveCard:shouldComponentUpdate:return true")
    return true
  }

  render() {
    console.log("AirLiveCard.js:render(): ")
    console.log(this.props)

    if (this.props.liveData == null) {
      return (
        <div class="CardBody" style={{height: "300px"}}>
          <div class="CardItems" style={{width: "93%", marginLeft:"14px"}}>
            <AirTemperature temperatureData={null}/>
            <AirHumidity humidityData={null}/>
            <AirVentilation ventilationData={null}/>
          </div>
        </div>
      )  
    }

    return (
      <div class="CardBody" style={{height: "300px"}}>
        <div class="CardItems" style={{width: "93%", marginLeft:"14px"}}>
          <AirTemperature temperatureData={this.props.liveData.temperatureData}/>
          <AirHumidity humidityData={this.props.liveData.humidityData}/>
          <AirVentilation ventilationData={this.props.liveData.ventilationData}/>
        </div>
      </div>
    )
  }
}

class AirTemperature extends Component {
  constructor(props) {
    super(props)
    this.state = {
      //previous props
      temperatureData: null,
      //props
      mode: 0,
      setpoint: null,
      temperatureIn: null,
      temperatureOut: null,
      unitOn: null,
      timeMode: 0,
      //modeButton
      modeButtonStates: [
        { //off
          icon: "icon-iconmonstr-weather-135-blank",
          text: "off",
        },
        { //heating
          icon: "icon-iconmonstr-weather-136",
          text: null,
        },
        { //cooling
          icon: "icon-iconmonstr-weather-137",
          text: null
        },
      ],
      timeButtonStates: [
        { 
          icon: "icon-iconmonstr-time-3-1",
          text: "plan",
        },
        { 
          icon: "icon-iconmonstr-time-3-1",
          text: "once",
        },
        { 
          icon: "icon-iconmonstr-time-3-1",
          text: "temp",
        },
        { 
          icon: "icon-iconmonstr-time-3-1",
          text: "hold",
        },
      ],
    }
  }

  componentDidMount() {
    //console.log("AirTemperature - componentDidMount()")
    uibuilder.send({'topic':'air','payload': {temperature: {initialize: true}}})
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.temperatureData == null || samePropsAreInState(prevState, nextProps)) { //test edge case, state is changed, but props are still valid so they override the state change.
      console.log('AirTemperature:getDerivedStateFromProps:return null')
      return null;
    }
    console.log('AirTemperature:getDerivedStateFromProps:return ', nextProps.temperatureData)
    return {temperatureData: nextProps.temperatureData, ...nextProps.temperatureData};
  }

  shouldComponentUpdate(nextProps, nextState){
    if((this.state == nextState)){ //since we derive state from props, this check is sufficient - no need to check props
      console.log("AirTemperature:shouldComponentUpdate:return false")
      return false
    }
    console.log("AirTemperature:shouldComponentUpdate:return true")
    return true
  }

  //mode button
  handleModeButtonClick = () => {
    console.log("AirTemperature:handleModeButtonClick(): ")
    clearTimeout(this.tempModeButtonSendTimerID);
    this.advanceOneState();
    this.tempModeButtonSendTimerID = setTimeout(() => this.onModeButtonTimeout(), 5000);
  }

  advanceOneState = () => {
    //set mode
    var newMode = (this.state.mode == (this.state.modeButtonStates.length-1)) ? 0 : this.state.mode + 1;
    this.setState({ mode: newMode });
  }

  onModeButtonTimeout = () => {
    uibuilder.send({'topic':'air','payload': {'temperature': {'mode': this.state.mode}}})
  }

  //setpoint button
  handleSetpointButtonClick = (buttonId) => {
    console.log("AirTemperature:handleSetpointButtonClick(): ")
    //set send timer
    clearTimeout(this.tempSetpointButtonSendTimerID);
    this.tempSetpointButtonSendTimerID = setTimeout(() => this.onSetpointButtonTimeout(), 5000);

    //buttonId: 0 for decrease, 1 for increase, 2 for time
    if(buttonId === 2) {
      //set time mode
      var newTimeMode = (this.state.timeMode == (this.state.timeButtonStates.length-1)) ? 0 : this.state.timeMode + 1;
      this.setState({ timeMode: newTimeMode });
    } else {
      //set setpoint
      var newSetpoint = (buttonId === 1) ? this.state.setpoint+1 : this.state.setpoint-1;
      this.setState({ setpoint: newSetpoint });
    }
  }

  onSetpointButtonTimeout = () => {
    uibuilder.send({'topic':'air','payload': {'temperature': {'setpoint': this.state.setpoint, 'timeMode': this.state.timeMode}}})
  }

  componentWillUnmount() {
    clearTimeout(this.tempModeButtonSendTimerID);
    clearTimeout(this.tempSetpointButtonSendTimerID);
  }

  render() {
    console.log("AirTemperature:render(): ")
    console.log('props:', this.props)
    console.log('state:', this.state)

    if(this.state.setpoint == null){
      return (
      <div class="CardItem">
          <div class="CircleRectangleButtons">
              <div class="CircleButton" style={{marginRight: "-7px"}}>
                <CircularButton disable={true} icon={this.state.modeButtonStates[0].icon}/>
                <CircleTrim disable={true} left="-7px"/>
              </div>
              <SquareButton disable={true} icon="expand_more"/>
              <div class="RectangleDisplay" style={{width: "57px"}}>
                  <div class="ValueDisplay">
                      <DisplayValueAndUnits value={null} units={"°"}/>
                  </div>
              </div>
              <SquareButton disable={true} icon="expand_less"/>
              <div class="CircleButton" style={{marginLeft: "-7px"}}>
                <CircleTrim disable={true} right="-7px" flip={true}/>
                <CircularButton disable={true} icon={"icon-iconmonstr-time-3-1"}/>
              </div>
          </div>
          <div class="DisplayContainer">
              <DisplayColumn label={"in"} value={null} units={"°"} />
              <DisplayColumn label={"out"} value={null} units={"°"} />
          </div>
        </div>
      )
    }

    return (
        <div class="CardItem">
            <div class="CircleRectangleButtons">
                <div class="CircleButton" style={{marginRight: "-7px"}}>
                  <CircularButton disable={false} highlight={this.state.unitOn} icon={this.state.modeButtonStates[this.state.mode].icon} text={this.state.modeButtonStates[this.state.mode].text} buttonClickHandler={this.handleModeButtonClick} bottomPosition="40px" rightPosition="-20px"/>
                  <CircleTrim disable={(this.state.mode == 0)} left="-7px"/>
                </div>
                <SquareButton disable={(this.state.mode == 0)} highlight={false} icon="expand_more" buttonClickHandler={this.handleSetpointButtonClick} buttonId={0}/>
                <div class="RectangleDisplay" style={{width: "57px"}}>
                    <div class="ValueDisplay">
                        <DisplayValueAndUnits value={this.state.setpoint} units={"°"}/>
                    </div>
                </div>
                <SquareButton disable={(this.state.mode == 0)} highlight={false} icon="expand_less" buttonClickHandler={this.handleSetpointButtonClick} buttonId={1}/>
                <div class="CircleButton" style={{marginLeft: "-7px"}}>
                    <CircleTrim disable={(this.state.mode == 0)} right="-7px" flip={true}/>
                    <CircularButton disable={(this.state.mode == 0)} highlight={false} icon="icon-iconmonstr-time-3-1" text={this.state.timeButtonStates[this.state.timeMode].text} buttonClickHandler={this.handleSetpointButtonClick} buttonId={2}/>
                </div>
            </div>
            <div class="DisplayContainer">
              <DisplayColumn label={"in"} value={this.state.temperatureIn} units={"°"} />
              <DisplayColumn label={"out"} value={this.state.temperatureOut} units={"°"} />
            </div>
        </div>
    )
  }
}

class AirHumidity extends Component {
  constructor(props) {
    super(props)
    this.state = {
      //prev props
      humidityData: null,
      //props
      mode: 0,
      setpoint: null,
      humidityIn: null,
      humidityOut: null,
      unitOn: null,
      fanMode: 0,
      fanOn: null,
      fanTime: null,
      //modeButton - // 0 is "off", 1 is "humidify", 2 is "dehumidify"
      modeButtonStates: [
        { //off
          icon: "icon-iconmonstr-drop-19-blank",
          text: "off",
        },
        { //humidify
          icon: "icon-iconmonstr-drop-21",
          text: null,
        },
        { //dehumidify
          icon: "icon-iconmonstr-drop-19",
          text: null
        },
      ],
      //fanButton - // 0-"auto", 1-"15", 2-"30", 3-"60", 4-"120", 5-"240", 6-"480"
      fanButtonStates: [
        { 
          text: "auto",
        },
        { 
          text: "15 min",
        },
        { 
          text: "30 min",
        },
        { 
          text: "1 hr",
        },
        { 
          text: "2 hr",
        },
        { 
          text: "4 hr",
        },
        { 
          text: "8 hr",
        },
      ],
    }
  }

  componentDidMount() {
    //console.log("AirHumidity - componentDidMount()")
    uibuilder.send({'topic':'air','payload': {humidity: {initialize: true}}})
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.humidityData == null || samePropsAreInState(prevState, nextProps)) { //test edge case, state is changed, but props are still valid so they override the state change.
      console.log('AirHumidity:getDerivedStateFromProps:return null')
      return null;
    }
    console.log('AirHumidity:getDerivedStateFromProps:return ', nextProps.humidityData)
    return {humidityData: nextProps.humidityData, ...nextProps.humidityData};
  }

  shouldComponentUpdate(nextProps, nextState){
    if((this.state == nextState)){ //since we derive state from props, this check is sufficient - no need to check props
      console.log("AirHumidity:shouldComponentUpdate:return false")
      return false
    }
    console.log("AirHumidity:shouldComponentUpdate:return true")
    return true
  }

  //mode button
  handleModeButtonClick = () => {
    console.log("AirHumidity:handleModeButtonClick(): ")
    clearTimeout(this.tempModeButtonSendTimerID);
    this.advanceOneState();
    this.tempModeButtonSendTimerID = setTimeout(() => this.onModeButtonTimeout(), 5000);
  }

  advanceOneState = () => {
    //set mode
    var newMode = (this.state.mode == (this.state.modeButtonStates.length-1)) ? 0 : this.state.mode + 1;
    this.setState({ mode: newMode });
  }

  onModeButtonTimeout = () => {
    uibuilder.send({'topic':'air','payload': {'humidity': {'mode': this.state.mode}}})
  }

  //setpoint button
  handleSetpointButtonClick = (buttonId) => {
    console.log("AirHumidity:handleSetpointButtonClick(): ")
    //set send timer
    clearTimeout(this.tempSetpointButtonSendTimerID);
    this.tempSetpointButtonSendTimerID = setTimeout(() => this.onSetpointButtonTimeout(), 5000);

    //buttonId: 0 for decrease, 1 for increase
    //set setpoint
    var newSetpoint = (buttonId === 1) ? this.state.setpoint+1 : this.state.setpoint-1;
    this.setState({ setpoint: newSetpoint });
  }

  onSetpointButtonTimeout = () => {
    uibuilder.send({'topic':'air','payload': {'humidity': {'setpoint': this.state.setpoint}}})
  }

  //fan button
  handleFanButtonClick = () => {
    console.log("AirHumidity:handleFanButtonClick(): ")
    //set send timer
    clearTimeout(this.tempFanButtonSendTimerID);
    this.tempFanButtonSendTimerID = setTimeout(() => this.onFanButtonTimeout(), 5000);
    
    //set fan mode
    var newFanMode = (this.state.fanMode == (this.state.fanButtonStates.length-1)) ? 0 : this.state.fanMode + 1;
    this.setState({ fanMode: newFanMode });
  }

  onFanButtonTimeout = () => {
    uibuilder.send({'topic':'air','payload': {'humidity': {'fanMode': this.state.fanMode}}})
  }

  componentWillUnmount() {
    clearTimeout(this.tempModeButtonSendTimerID);
    clearTimeout(this.tempSetpointButtonSendTimerID);
    clearTimeout(this.tempFanButtonSendTimerID);
  }

  render() {
    console.log("AirHumidity:render(): ")
    console.log(this.props)

    if (this.state.setpoint == null) {
      return (
          <div class="CardItem">
              <div class="CircleRectangleButtons">
                  <div class="CircleButton" style={{marginRight: "-7px"}}>
                      <CircularButton disable={true} icon={this.state.modeButtonStates[0].icon}/>
                      <CircleTrim disable={true} left="-7px"/>
                  </div>
                  <SquareButton disable={true} icon="expand_more"/>
                  <div class="RectangleDisplay" style={{width: "57px"}}>
                      <div class="ValueDisplay">
                          <DisplayValueAndUnits value={null} units={"%"}/>
                      </div>
                  </div>
                  <SquareButton disable={true} icon="expand_less" corners="0 4px 4px 0"/>
                  <div class="CircleButton" style={{marginLeft:"6px"}}>
                      <CircularButton disable={true} icon="icon-fan"/>
                  </div>
              </div>
              <div class="DisplayContainer">
                <DisplayColumn label={"in"} value={null} units={"%"} />
                <DisplayColumn label={"out"} value={null} units={"%"} />
              </div>
          </div>
      ) 
    }

    return (
          <div class="CardItem">
              <div class="CircleRectangleButtons">
                  <div class="CircleButton" style={{marginRight: "-7px"}}>
                      <CircularButton disable={false} highlight={this.state.unitOn} icon={this.state.modeButtonStates[this.state.mode].icon} text={this.state.modeButtonStates[this.state.mode].text} buttonClickHandler={this.handleModeButtonClick} bottomPosition="24px" rightPosition="-18px"/>
                      <CircleTrim disable={(this.state.mode == 0)} left="-7px"/>
                  </div>
                  <SquareButton disable={(this.state.mode == 0)} highlight={false} icon="expand_more" buttonClickHandler={this.handleSetpointButtonClick} buttonId={0}/>
                  <div class="RectangleDisplay" style={{width: "57px"}}>
                      <div class="ValueDisplay">
                          <DisplayValueAndUnits value={this.state.setpoint} units={"%"}/>
                      </div>
                  </div>
                  <SquareButton disable={(this.state.mode == 0)} highlight={false} icon="expand_less" buttonClickHandler={this.handleSetpointButtonClick} buttonId={1} corners="0 4px 4px 0"/>
                  <div class="CircleButton" style={{marginLeft:"6px"}}>
                      <CircularButton disable={false} highlight={this.state.fanOn} icon="icon-fan" text={this.state.fanButtonStates[this.state.fanMode].text} buttonClickHandler={this.handleFanButtonClick}/>
                  </div>
              </div>
              <div class="DisplayContainer">
                <DisplayColumn label={"in"} value={this.state.humidityIn} units={"%"} />
                <DisplayColumn label={"out"} value={this.state.humidityOut} units={"%"} />
              </div>
          </div>
    )
  }
}

class AirVentilation extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
    //console.log("AirVentilation - componentDidMount()")
    uibuilder.send({'topic':'air','payload': {ventilation: {initialize: true}}})
  }

  shouldComponentUpdate(nextProps){
    if(nextProps.ventilationData == null){
      console.log("AirVentilation:shouldComponentUpdate:return false")
      return false
    }
    console.log("AirVentilation:shouldComponentUpdate:return true")
  return true
  }

  render() {
    console.log("AirVentilation:render(): ")
    console.log(this.props)

  if (this.props.ventilationData == null) {
      return (
          <div class="CardItem">
              <div class="CircleRectangleButtons">
                  <div class="CircleButton" style={{marginRight: "-7px"}}>
                      <div class="Circle">
                          <div class="CircleIcon">
                              <i class="icon-iconmonstr-weather-91-1"></i>
                          </div>
                          <div class="CircleText">
                              <div class="CardBodyTextCenteredHighlight">
                                  auto
                              </div>
                          </div>
                      </div>
                      <svg class="AroundCircleSvg" style={{left: "-7px"}} viewBox="0 0 3.415 17.462"><path d="M.016 0a12.965 12.965 0 013.4 8.731V0zm3.4 8.731A12.965 12.965 0 010 17.463h3.415z"/></svg>
                  </div>
                  <div class="RectangleButton"><i class="material-icons md-42">expand_more</i></div>
                  <div class="RectangleDisplay" style={{width: "112px"}}>
                      <div class="ValueDisplay">
                          1230
                          <div class="CardBodyUnits">
                              ppm
                          </div>
                      </div>
                  </div>
                  <div class="RectangleButton" style={{borderRadius: "0 4px 4px 0"}}><i class="material-icons md-42">expand_less</i></div>
              </div>
              <div class="DisplayContainer">
                  <div class="DisplayColumn">
                      <div class="CardBodyText">
                          in
                      </div>
                      <div class="ValueDisplay">
                          <DisplayValueSeparateUnits value={null} units={"ppm"}/>
                      </div>
                  </div>
              </div>
          </div>
      ) 
  }

    return (
        <div class="CardItem">
            <div class="CircleRectangleButtons">
                <div class="CircleButton" style={{marginRight: "-7px"}}>
                    <div class="Circle">
                        <div class="CircleIcon">
                            <i class="icon-iconmonstr-weather-91-1"></i>
                        </div>
                        <div class="CircleText">
                            <div class="CardBodyTextCenteredHighlight">
                                auto
                            </div>
                        </div>
                    </div>
                    <svg class="AroundCircleSvg" style={{left: "-7px"}} viewBox="0 0 3.415 17.462"><path d="M.016 0a12.965 12.965 0 013.4 8.731V0zm3.4 8.731A12.965 12.965 0 010 17.463h3.415z"/></svg>
                </div>
                <div class="RectangleButton"><i class="material-icons md-42">expand_more</i></div>
                <div class="RectangleDisplay" style={{width: "112px"}}>
                    <div class="ValueDisplay">
                        1230
                        <div class="CardBodyUnits">
                            ppm
                        </div>
                    </div>
                </div>
                <div class="RectangleButton" style={{borderRadius: "0 4px 4px 0"}}><i class="material-icons md-42">expand_less</i></div>
            </div>
            <div class="DisplayContainer">
                <div class="DisplayColumn">
                    <div class="CardBodyText">
                        in
                    </div>
                    <div class="ValueDisplay">
                        <DisplayValueSeparateUnits value={this.props.ventilationData.co2In} units={"ppm"}/>
                    </div>
                </div>
            </div>
        </div>
    )
  }
}

export default AirLiveCard
