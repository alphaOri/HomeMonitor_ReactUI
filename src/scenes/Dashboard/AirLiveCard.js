import React, { Component } from 'react'
import './dashboard.css'
import '../fonts/material-design-icons/iconfont/material-icons.css'
import '../fonts/icomoon/style.css'
import uibuilder from '../../libs/uibuilder/uibuilderfe.js'
import { DisplayValueAndUnits, DisplayValueSeparateUnits } from './DisplayValue.js'

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
			<div class="CardBody">
				<div class="CardItems" style={{width: "93%", marginLeft:"14px"}}>
	                <AirTemperature temperatureData={null}/>
					<AirHumidity humidityData={null}/>
					<AirVentilation ventilationData={null}/>
				</div>
			</div>
	    ) 
	}

    return (
		<div class="CardBody">
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
    }
  }

  componentDidMount() {
  	console.log("AirTemperature - componentDidMount()")
  }

  shouldComponentUpdate(nextProps){
  	if(nextProps.temperatureData == null){
  		console.log("AirTemperature:shouldComponentUpdate:return false")
  		return false
  	}
  	console.log("AirTemperature:shouldComponentUpdate:return true")
	return true
  }

  render() {
  	console.log("AirTemperature:render(): ")
  	console.log(this.props)

	if (this.props.temperatureData == null) {
	    return (
			<div class="CardItem">
	            <div class="CircleRectangleButtons">
	                <div class="CircleButton" style={{marginRight: "-7px"}}>
	                    <div class="Circle">
	                        <div class="CircleIcon">
	                            <i class="icon-iconmonstr-weather-137"></i>
	                        </div>
	                    </div>
	                    <svg class="AroundCircleSvg" style={{left: "-7px"}} viewBox="0 0 3.415 17.462"><path d="M.016 0a12.965 12.965 0 013.4 8.731V0zm3.4 8.731A12.965 12.965 0 010 17.463h3.415z"/></svg>
	                </div>
	                <div class="RectangleButton"><i class="material-icons md-42">expand_more</i></div>
	                <div class="RectangleDisplay" style={{width: "57px"}}>
	                    <div class="ValueDisplay">
	                        68°
	                    </div>
	                </div>
	                <div class="RectangleButton"><i class="material-icons md-42">expand_less</i></div>
	                <div class="CircleButton" style={{marginLeft: "-7px"}}>
	                    <svg class="AroundCircleSvg" style={{left: "unset", right: "-7px", transform: "scale(-1,1)"}} viewBox="0 0 3.415 17.462"><path d="M.016 0a12.965 12.965 0 013.4 8.731V0zm3.4 8.731A12.965 12.965 0 010 17.463h3.415z" /></svg>
	                    <div class="Circle">
	                        <div class="CircleIcon">
	                            <i class="icon-iconmonstr-time-3-1"></i>
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
                    <div class="Circle">
                        <div class="CircleIcon">
                            <i class="icon-iconmonstr-weather-137"></i>
                        </div>
                    </div>
                    <svg class="AroundCircleSvg" style={{left: "-7px"}} viewBox="0 0 3.415 17.462"><path d="M.016 0a12.965 12.965 0 013.4 8.731V0zm3.4 8.731A12.965 12.965 0 010 17.463h3.415z"/></svg>
                </div>
                <div class="RectangleButton"><i class="material-icons md-42">expand_more</i></div>
                <div class="RectangleDisplay" style={{width: "57px"}}>
                    <div class="ValueDisplay">
                        68°
                    </div>
                </div>
                <div class="RectangleButton"><i class="material-icons md-42">expand_less</i></div>
                <div class="CircleButton" style={{marginLeft: "-7px"}}>
                    <svg class="AroundCircleSvg" style={{left: "unset", right: "-7px", transform: "scale(-1,1)"}} viewBox="0 0 3.415 17.462"><path d="M.016 0a12.965 12.965 0 013.4 8.731V0zm3.4 8.731A12.965 12.965 0 010 17.463h3.415z" /></svg>
                    <div class="Circle">
                        <div class="CircleIcon">
                            <i class="icon-iconmonstr-time-3-1"></i>
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
