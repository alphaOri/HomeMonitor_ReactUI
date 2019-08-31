import React, { Component } from 'react'
import './dashboard.css'
import '../fonts/material-design-icons/iconfont/material-icons.css'
import WaterCard from './WaterCard'

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    	water: null
    }
  }

  componentWillReceiveProps() {
  	if(this.props.data.payload !== undefined) {
	  	if(this.props.data.payload.water !== undefined) {
	  		this.setState((state, props) => ({
			  water: this.props.data.payload.water
			}));
	  	}
	}
  }

  render() {

    return (
		<div ref="root">
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
					<WaterCard waterData={this.state.water}/>
				</div>
	    	</div>
		</div>
	)
  }
}


export default Dashboard
