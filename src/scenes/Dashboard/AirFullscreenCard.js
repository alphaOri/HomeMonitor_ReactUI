import React, { Component } from 'react'
import './dashboard.css'
import '../fonts/material-design-icons/iconfont/material-icons.css'
import HomeAirCard from './HomeAirCard'
import {AirTemperatureSettings, AirHumiditySettings, AirVentilationSettings} from './AirSettings'
//import uibuilder from '../../libs/uibuilder/uibuilderfe.js'

class AirFullscreenCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
  	//console.log("AirFullscreenCard - componentDidMount()")
  	// request historical data
  	//uibuilder.send({'topic':'water','payload':'initialize'})
  }

  shouldComponentUpdate(nextProps){
  	if(nextProps.air == null){
  		//console.log("AirFullscreenCard:shouldComponentUpdate:return false")
  		return false
  	}
  	//console.log("AirFullscreenCard:shouldComponentUpdate:return true")
	return true
  }



  render() {
  	//console.log("AirFullscreenCard.js:render(): ")
  	//console.log(this.props)

  	if (this.props.air == null) {
	    return (
	    	<div class="CardBoardContainer">
				<HomeAirCard air={undefined}/>
				<AirTemperatureSettings temperatureSettings={undefined}/>
        <AirHumiditySettings humiditySettings={undefined}/>
        <AirVentilationSettings ventilationSettings={undefined}/>
			</div>
	    ) 
	}

    return (
    	<div class="CardBoardContainer">
  			<HomeAirCard air={this.props.air}/> {/*this will render the card header unnecessarily but since HomeAirCard has to be called from dashboard and here, there is no good workaround*/}
  			<AirTemperatureSettings temperatureSettings={this.props.air.temperatureSettings}/>
        <AirHumiditySettings humiditySettings={this.props.air.humiditySettings}/>
        <AirVentilationSettings ventilationSettings={this.props.air.ventilationSettings}/>
  		</div>
    ) 
  }
}

export default AirFullscreenCard
