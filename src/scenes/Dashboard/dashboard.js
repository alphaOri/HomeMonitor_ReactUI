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
    	water: null
    }
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
  	/*if(this.props.payload) {
	  	if(this.props.payload.water !== undefined && (this.state.water !== this.props.payload.water)) {
	  		this.setState((state, props) => ({
			  water: this.props.payload.water
			}));
	  	}
	}*/

	if (this.props.payload == null) {
		return (
		    <div class="MainBackground">
	  			<div class="MainTopBar">
					<div class="CardBarTitle">
						No connection to Node-Red...
					</div>
	    		</div>
				<div class="CardBoardContainer">
				</div>
	    	</div> 
	    )
	}

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
				<WaterCard water={this.props.payload.water}/>
			</div>
    	</div>
	)
  }
}


export default Dashboard
