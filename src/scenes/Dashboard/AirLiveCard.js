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
      //modeButton
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
      modeButtonCurrentState: 0,
      useStateMode: false,
      //setpoint buttons
      useStateSetpoint: false,
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
      timeButtonCurrentState: 0,
      useStateTimeMode: false,
    }
  }

  /*componentDidMount() {
    console.log("AirTemperature - componentDidMount()")
  }*/

  shouldComponentUpdate(nextProps, nextState){
    if((nextProps.temperatureData == null) && (this.state === nextState)){
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
    var newMode;
    if(!this.state.useStateMode){
      this.setState({ useStateMode: true});
      if(this.props.temperatureData.mode == (this.state.modeButtonStates.length-1)) {
        newMode = 0;
      } else {
        newMode = this.props.temperatureData.mode + 1;
      }
    } else {
      newMode = this.state.modeButtonCurrentState + 1;
    }
    this.setState({ modeButtonCurrentState: newMode });
  }

  onModeButtonTimeout = () => {
    uibuilder.send({'topic':'air','payload': {'temperature': {'mode': this.state.modeButtonCurrentState}}})
    this.setState({ useStateMode: false});
  }

  //setpoint button
  handleSetpointButtonClick = (isIncrease) => {
    console.log("AirTemperature:handleSetpointButtonClick(): ")
    //set send timer
    clearTimeout(this.tempSetpointButtonSendTimerID);
    this.tempSetpointButtonSendTimerID = setTimeout(() => this.onSetpointButtonTimeout(), 5000);
    //set blink timer
    clearInterval(this.tempSetpointValueBlinkIntervalID)
    this.setState({ setpointValueVisible: true});
    this.tempSetpointValueBlinkIntervalID = setInterval(() => {this.setState(prevState => ({setpointValueVisible: !prevState.setpointValueVisible}))}, 500);
    //set setpoiunt
    var newSetpoint;
    if(!this.state.useStateSetpoint){
      this.setState({ useStateSetpoint: true});
      newSetpoint = isIncrease ? this.props.temperatureData.setpoint+1 : this.props.temperatureData.setpoint-1;
    } else {
      newSetpoint = isIncrease ? this.state.setpoint+1 : this.state.setpoint-1;
    }
    this.setState({ setpoint: newSetpoint });
  }

  onSetpointButtonTimeout = () => {
    uibuilder.send({'topic':'air','payload': {'temperature': {'setpoint': this.state.setpoint, 'timeMode': this.state.timeButtonCurrentState}}})
    this.setState({useStateSetpoint: false})
    this.setState({useStateTimeMode: false})
    // disable blink
    clearInterval(this.tempSetpointValueBlinkIntervalID);
    this.setState({setpointValueVisible : true});
  }

  //time mode button
  handleTimeButtonClick = () => {
    console.log("AirTemperature:handleTimeButtonClick(): ")
    //set send timer
    clearTimeout(this.tempSetpointButtonSendTimerID);
    this.tempSetpointButtonSendTimerID = setTimeout(() => this.onSetpointButtonTimeout(), 5000);
    //set blink timer
    clearInterval(this.tempSetpointValueBlinkIntervalID)
    this.setState({ setpointValueVisible: true});
    this.tempSetpointValueBlinkIntervalID = setInterval(() => {this.setState(prevState => ({setpointValueVisible: !prevState.setpointValueVisible}))}, 500);
    //set time mode
    var newTimeMode;
    if(!this.state.useStateTimeMode){
      this.setState({ useStateTimeMode: true});
      if(this.props.temperatureData.timeMode == (this.state.timeButtonStates.length-1)) {
        newTimeMode = 0;
      } else {
        newTimeMode = this.props.temperatureData.timeMode + 1;
      }
    } else {
      newTimeMode = this.state.timeButtonCurrentState + 1;
    }
    this.setState({ timeButtonCurrentState: newTimeMode });
  }

  componentWillUnmount() {
    clearTimeout(this.tempModeButtonSendTimerID);
    clearTimeout(this.tempSetpointButtonSendTimerID);
    clearInterval(this.tempSetpointValueBlinkIntervalID);
  }

  render() {
    console.log("AirTemperature:render(): ")
    console.log(this.props)

    if(this.props.temperatureData == null){
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
                      <DisplayValueAndUnits disable={!this.state.setpointValueVisible} value={null} units={"°"}/>
                  </div>
              </div>
              <SquareButton disable={true}/>
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

    var setpoint = this.state.useStateSetpoint ? this.state.setpoint : this.props.temperatureData.setpoint;
    var modeState = this.state.useStateMode ? this.state.modeButtonCurrentState : this.props.temperatureData.mode;
    var timeModeState = this.state.useStateTimeMode ? this.state.timeButtonCurrentState : this.props.temperatureData.timeMode;

    return (
    <div class="CardItem">
            <div class="CircleRectangleButtons">
                <div class="CircleButton" style={{marginRight: "-7px"}}>
                  <CircularButton disable={false} highlight={this.props.temperatureData.unitOn} icon={this.state.modeButtonStates[modeState].icon} text={this.state.modeButtonStates[modeState].text} buttonClickHandler={this.handleModeButtonClick} bottomPosition="40px" rightPosition="7px"/>
                  <CircleTrim disable={(modeState == 0)} left="-7px"/>
                </div>
                <SquareButton disable={(modeState == 0)} highlight={false} icon="expand_more" buttonClickHandler={this.handleSetpointButtonClick} type={false}/>
                <div class="RectangleDisplay" style={{width: "57px"}}>
                    <div class="ValueDisplay">
                        <DisplayValueAndUnits disable={!this.state.setpointValueVisible} value={setpoint} units={"°"}/>
                    </div>
                </div>
                <SquareButton disable={(modeState == 0)} highlight={false} icon="expand_less" buttonClickHandler={this.handleSetpointButtonClick} type={true}/>
                <div class="CircleButton" style={{marginLeft: "-7px"}}>
                    <CircleTrim disable={(modeState == 0)} right="-7px" flip={true}/>
                    <CircularButton disable={(modeState == 0)} highlight={false} icon="icon-iconmonstr-time-3-1" text={this.state.timeButtonStates[timeModeState].text} textDisable={!this.state.setpointValueVisible} buttonClickHandler={this.handleTimeButtonClick}/>
                </div>
            </div>
            <div class="DisplayContainer">
                <div class="DisplayColumn">
                <div class="CardBodyText">
                    in
                </div>
                <div class="ValueDisplay">
                    <DisplayValueAndUnits value={this.props.temperatureData.temperatureIn} units={"°"}/>
                </div>
            </div>
            <div class="DisplayColumn">
                <div class="CardBodyText">
                    out
                </div>
                <div class="ValueDisplay">
                    <DisplayValueAndUnits value={this.props.temperatureData.temperatureOut} units={"°"}/>
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
