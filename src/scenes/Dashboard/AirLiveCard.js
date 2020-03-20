import React, { Component } from 'react'
import './dashboard.css'
import '../fonts/material-design-icons/iconfont/material-icons.css'
import '../fonts/icomoon/style.css'
import uibuilder from '../../libs/uibuilder/uibuilderfe.js'
import { DisplayValueAndUnits, DisplayValueSeparateUnits } from './DisplayValue.js'
import { RectangularButton, CircularButton, CircleTrim, SquareButton } from './Buttons.js'

class AirLiveCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
    console.log("AirLiveCard - componentDidMount()")
    // request historical data
    uibuilder.send({'topic':'air','payload': {liveData: 'initialize'}})
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
      //props
      temperatureIn: null,
      temperatureOut: null,
      unitOn: null,
      //modeButton
      mode: 0,
      modeButtonStates: [
        { //off
          mode: "off",
          icon: "icon-iconmonstr-weather-135-blank",
          text: "off",
        },
        { //heating
          mode: "heat",
          icon: "icon-iconmonstr-weather-136",
          text: null,
        },
        { //cooling
          mode: "cool",
          icon: "icon-iconmonstr-weather-137",
          text: null
        },
      ],
      //setpoint buttons
      setpoint: null,
      setpointValueVisible: true,
      //time button
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
      timeMode: 0,
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.temperatureData == null) {
      console.log('AirTemperature:getDerivedStateFromProps:return null')
      return null;
    }
    console.log('AirTemperature:getDerivedStateFromProps:return ', nextProps.temperatureData)
    return nextProps.temperatureData;
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
    console.log("AirTemperature:handleTempButtonClick(): ")
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
      this.setState({ timeButtonCurrentState: newTimeMode });
    } else {
      //set setpoint
      var newSetpoint = (buttonId === 1) ? this.state.setpoint+1 : this.state.setpoint-1;
      this.setState({ setpoint: newSetpoint });
    }
  }

  onSetpointButtonTimeout = () => {
    uibuilder.send({'topic':'air','payload': {'temperature': {'setpoint': this.state.setpoint, 'timeMode': this.state.timeButtonCurrentState}}})
  }

  componentWillUnmount() {
    clearTimeout(this.tempModeButtonSendTimerID);
    //clearTimeout(this.tempSetpointButtonSendTimerID);
    clearInterval(this.tempSetpointValueBlinkIntervalID);
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
              <SquareButton disable={true} icon={this.state.modeButtonStates[0].icon}/>
              <div class="RectangleDisplay" style={{width: "57px"}}>
                  <div class="ValueDisplay">
                      <DisplayValueAndUnits value={null} units={"°"}/>
                  </div>
              </div>
              <SquareButton disable={true} icon={this.state.modeButtonStates[0].icon}/>
              <div class="CircleButton" style={{marginLeft: "-7px"}}>
                <CircleTrim disable={true} right="-7px" flip={true}/>
                <CircularButton disable={true} icon={"icon-iconmonstr-time-3-1"}/>
              </div>
          </div>
          <div class="DisplayContainer">
              <div class="DisplayColumn">
              <div class="CardBodyText">
                  in
              </div>
              <div class="ValueDisplay">
                  <DisplayValueAndUnits value={null} units={"°"}/>
              </div>
          </div>
          <div class="DisplayColumn">
              <div class="CardBodyText">
                  out
              </div>
              <div class="ValueDisplay">
                  <DisplayValueAndUnits value={null} units={"°"}/>
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
                  <CircularButton disable={false} highlight={this.state.unitOn} icon={this.state.modeButtonStates[this.state.mode].icon} text={this.state.modeButtonStates[this.state.mode].text} buttonClickHandler={this.handleModeButtonClick} bottomPosition="40px" rightPosition="7px"/>
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
                <div class="DisplayColumn">
                <div class="CardBodyText">
                    in
                </div>
                <div class="ValueDisplay">
                    <DisplayValueAndUnits value={this.state.temperatureIn} units={"°"}/>
                </div>
            </div>
            <div class="DisplayColumn">
                <div class="CardBodyText">
                    out
                </div>
                <div class="ValueDisplay">
                    <DisplayValueAndUnits value={this.state.temperatureOut} units={"°"}/>
                </div>
            </div>
            </div>
        </div>
    )
  }
}

class AirHumidity extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
    console.log("AirHumidity - componentDidMount()")
  }

  shouldComponentUpdate(nextProps){
    if(nextProps.humidityData == null){
      console.log("AirHumidity:shouldComponentUpdate:return false")
      return false
    }
    console.log("AirHumidity:shouldComponentUpdate:return true")
  return true
  }

  render() {
    console.log("AirHumidity:render(): ")
    console.log(this.props)

  if (this.props.humidityData == null) {
      return (
          <div class="CardItem">
              <div class="CircleRectangleButtons">
                  <div class="CircleButton" style={{marginRight: "-7px"}}>
                      <div class="Circle" style={{backgroundColor: "var(--button-highlight-color)"}}>
                          <div class="CircleIcon">
                              <i class="icon-iconmonstr-drop-21"></i>
                          </div>
                      </div>
                      <svg class="AroundCircleSvg" style={{left: "-7px"}} viewBox="0 0 3.415 17.462"><path d="M.016 0a12.965 12.965 0 013.4 8.731V0zm3.4 8.731A12.965 12.965 0 010 17.463h3.415z"/></svg>
                  </div>
                  <div class="RectangleButton"><i class="material-icons md-42">expand_more</i></div>
                  <div class="RectangleDisplay" style={{width: "57px"}}>
                      <div class="ValueDisplay">
                          45%
                      </div>
                  </div>
                  <div class="RectangleButton" style={{borderRadius: "0 4px 4px 0"}}><i class="material-icons md-42">expand_less</i></div>
                  <div class="CircleButton" style={{marginLeft:"6px"}}>
                      <div class="Circle">
                          <div class="CircleIcon">
                              <i class="icon-fan"></i>
                          </div>
                          <div class="CircleText">
                              <div class="CardBodyTextCenteredHighlight">
                                  auto
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="DisplayContainer">
                  <div class="DisplayColumn">
                  <div class="CardBodyText">
                      in
                  </div>
                  <div class="ValueDisplay">
                      <DisplayValueAndUnits value={null} units={"%"}/>
                  </div>
              </div>
              <div class="DisplayColumn">
                  <div class="CardBodyText">
                      out
                  </div>
                  <div class="ValueDisplay">
                      <DisplayValueAndUnits value={null} units={"%"}/>
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
                    <div class="Circle" style={{backgroundColor: "var(--button-highlight-color)"}}>
                        <div class="CircleIcon">
                            <i class="icon-iconmonstr-drop-21"></i>
                        </div>
                    </div>
                    <svg class="AroundCircleSvg" style={{left: "-7px"}} viewBox="0 0 3.415 17.462"><path d="M.016 0a12.965 12.965 0 013.4 8.731V0zm3.4 8.731A12.965 12.965 0 010 17.463h3.415z"/></svg>
                </div>
                <div class="RectangleButton"><i class="material-icons md-42">expand_more</i></div>
                <div class="RectangleDisplay" style={{width: "57px"}}>
                    <div class="ValueDisplay">
                        45%
                    </div>
                </div>
                <div class="RectangleButton" style={{borderRadius: "0 4px 4px 0"}}><i class="material-icons md-42">expand_less</i></div>
                <div class="CircleButton" style={{marginLeft:"6px"}}>
                    <div class="Circle">
                        <div class="CircleIcon">
                            <i class="icon-fan"></i>
                        </div>
                        <div class="CircleText">
                            <div class="CardBodyTextCenteredHighlight">
                                auto
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="DisplayContainer">
                <div class="DisplayColumn">
                <div class="CardBodyText">
                    in
                </div>
                <div class="ValueDisplay">
                    <DisplayValueAndUnits value={this.props.humidityData.humidityIn} units={"%"}/>
                </div>
            </div>
            <div class="DisplayColumn">
                <div class="CardBodyText">
                    out
                </div>
                <div class="ValueDisplay">
                    <DisplayValueAndUnits value={this.props.humidityData.humidityOut} units={"%"}/>
                </div>
            </div>
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
    console.log("AirVentilation - componentDidMount()")
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
