import React, { Component } from 'react'
import './dashboard.css'
import '../fonts/material-design-icons/iconfont/material-icons.css'
import './roboto-font.css'
import HomeWaterCard from './HomeWaterCard'
import WaterFullscreenCard from './WaterFullscreenCard'
import HeaderClock from './HeaderClock'
import uibuilder from '../../libs/uibuilder/uibuilderfe.js'

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    	water: null,
    	fullscreen: "none"
    }
  }

  handleFullscreen = (card) => {
  	this.setState({
	  fullscreen: card
	});
  }

  componentDidMount() {
  	//console.log("dashboard - componentDidMount()")
  	// this is cycled back into the ui in Node-Red to cause it to render for the first time
  	uibuilder.send({'topic':'dashboard','payload':'initialize'})
  }

  shouldComponentUpdate(nextProps){
  	if(nextProps.payload == null){
  		//console.log("dashboard:shouldComponentUpdate:return false")
  		return false;
  	}
  	//console.log("dashboard:shouldComponentUpdate:return true")
	return true;
  }

  render() {
  	//console.log("dashboard.js:render():")
  	//console.log(this.props)

	if (this.props.payload == null) {
		return (
		    <div class="MainBackground">
	  			<div class="MainTopBar">
					<div class="CardBarTitle">
						Connecting...
					</div>
	    		</div>
				<div class="CardBoardContainer">
				</div>
	    	</div> 
	    )
	}

	if(this.state.fullscreen === "none"){
	    return (
	  		<div class="MainBackground">
	  			<div class="MainTopBar">
	                <div class="CardBarLeft">
	                    <i class="material-icons md-36">menu</i>
	    				<div class="CardBarTitle">
	    					Home
	    				</div>
	                </div>
	                <div class="CardBarMiddle">
	                	<HeaderClock/>
	                </div>
					<div class="CardBarRight">
						<i class="material-icons md-36">settings</i>
					</div>
	    		</div>
				<div class="CardBoardContainer">
					<HomeWaterCard water={this.props.payload.water} 
					fullscreenClick = {this.handleFullscreen}/>
				</div>
	    	</div>
		)
	} else if (this.state.fullscreen === "water"){
		return (
			<div class="MainBackground">
	  			<div class="MainTopBar">
	                <div class="CardBarLeft">
	                    <i class="material-icons md-36" onClick={() => {this.handleFullscreen("none")}}>arrow_back</i>
	    				<div class="CardBarTitle">
	    					Water
	    				</div>
	                </div>
	                <div class="CardBarMiddle">
	                	<HeaderClock/>
	                </div>
					<div class="CardBarRight">
						<i class="material-icons md-36">settings</i>
					</div>
	    		</div>
				<WaterFullscreenCard water={this.props.payload.water}/>
	    	</div>
	    )
	}
  }
}


export default Dashboard
