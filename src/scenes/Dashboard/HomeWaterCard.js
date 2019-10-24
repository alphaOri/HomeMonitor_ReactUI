import React, { Component } from 'react'
import './dashboard.css'
import '../fonts/material-design-icons/iconfont/material-icons.css'
import CardHeader from './CardHeader'
//import uibuilder from '../../libs/uibuilder/uibuilderfe.js'
import WaterLiveCard from './WaterLiveCard'

class HomeWaterCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
  	//console.log("HomeWaterCard - componentDidMount()")
  	// request historical data
  	//uibuilder.send({'topic':'water','payload':'initialize'})
  }

  shouldComponentUpdate(nextProps){
  	if(nextProps.water == null){
  		//console.log("HomeWaterCard:shouldComponentUpdate:return false")
  		return false
  	}
  	//console.log("HomeWaterCard:shouldComponentUpdate:return true")
	return true
  }

  render() {
  	//console.log("HomeWaterCard.js:render(): ")
  	//console.log(this.props)

	if (this.props.water == null) {
	    return (
			<div class="CardContainer">
				<CardHeader title="Water (Connecting...)"/>
				<WaterLiveCard liveInfo={undefined}/>
			</div>
	    ) 
	}

    return (
		<div class="CardContainer">
			<CardHeader title="Water" 
				fullscreenClick={this.props.fullscreenClick} type="water"/>
			<WaterLiveCard liveInfo={this.props.water.liveInfo}/>
		</div>
    )
  }
}




export default HomeWaterCard
