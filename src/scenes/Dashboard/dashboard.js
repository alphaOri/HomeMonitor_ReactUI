import React, { Component } from 'react'
import './dashboard.css'
import '../fonts/material-design-icons/iconfont/material-icons.css'
import './roboto-font.css'
import WaterCard from './WaterCard'
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
  	//console.log("WaterCard - componentDidMount()")
  	// request historical data
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
						Connecting to Node-Red...
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
					<div class="CardBarTitle">
						Home
					</div>
					<div class="CardBarRight">
						<i class="material-icons md-36">settings</i>
					</div>
	    		</div>
				<div class="CardBoardContainer">
					<WaterCard water={this.props.payload.water} 
					fullscreenClick = {this.handleFullscreen}/>
				</div>
	    	</div>
		)
	} else if (this.state.fullscreen === "water"){
		return (
			<div class="MainBackground">
	  			<div class="MainTopBar">
					<div class="CardBarTitle">
						Home
					</div>
					<div class="CardBarRight">
						<i class="material-icons md-36">settings</i>
					</div>
	    		</div>
				<div class="CardBoardContainer">
				</div>
	    	</div>
	    )
	}
  }
}


export default Dashboard
