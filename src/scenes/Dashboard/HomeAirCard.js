import React, { Component } from 'react'
import './dashboard.css'
import '../fonts/material-design-icons/iconfont/material-icons.css'
import CardHeader from './CardHeader'
import AirLiveCard from './AirLiveCard'

class HomeAirCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
  	console.log("HomeAirCard - componentDidMount()")
  }

  shouldComponentUpdate(nextProps){
  	if(nextProps.air == null){
  		console.log("HomeAirCard:shouldComponentUpdate:return false")
  		return false
  	}
  	console.log("HomeAirCard:shouldComponentUpdate:return true")
	return true
  }

  render() {
  	console.log("HomeAirCard.js:render(): ")
  	console.log(this.props)

	if (this.props.air == null) {
	    return (
			<div class="CardContainer" style={{height: "378px"}}>
				<CardHeader title="Air (Connecting...)"/>
				<AirLiveCard liveData={undefined}/>
			</div>
	    ) 
	}

    return (
		<div class="CardContainer" style={{height: "378px"}}>
			<CardHeader title="Air" fullscreenClick={this.props.fullscreenClick} type="air"/>
			<AirLiveCard liveData={this.props.air.liveData}/>
		</div>
    )
  }
}




export default HomeAirCard
