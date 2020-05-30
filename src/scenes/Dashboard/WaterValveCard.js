import React, { Component } from 'react'
import { RectangularButton } from './Buttons.js'
import uibuilder from '../../libs/uibuilder/uibuilderfe.js'

class WaterValveCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
    	buttonState: "..."
    }
  }

  handleValveButtonClick = (command) => {
  	if(command === "open" || command === "close") {
  		uibuilder.send({'topic':'water','payload': {valve: command}})
  	}
  }

  componentDidMount() {
  	//console.log("WaterValveCard - componentDidMount()")
  	// request valve status
  	uibuilder.send({'topic':'water','payload': {valve: 'initialize'}})
  }

  shouldComponentUpdate(nextProps){
  	if(nextProps.valve == null){
  		console.log("WaterValveCard:shouldComponentUpdate:return false")
  		return false
  	}
  	console.log("WaterValveCard:shouldComponentUpdate:return true")
	return true
  }

  render() {
  	console.log("WaterValveCard.js:render(): ")
  	console.log(this.props)

	if (this.props.valve == null) {
	    return (
			<div class="MiniCardBody">
				<div class="CardItems" style={{width: "55%"}}>
					<div class="CardItem">
		                <div class="CardBodyTextCentered">
		                    Connecting to water valve...
		                    <span class="CardBodyTextCenteredHighlight"> ...</span>
		                </div>
					</div>
				</div>
			</div>
	    ) 
	}

	if ((this.props.valve === "open" || this.props.valve === "opening") && this.state.buttonState !== "close"){
		this.setState({
		  buttonState: "close"
		})
	} else if ((this.props.valve === "closed" || this.props.valve === "closing") && this.state.buttonState !== "open"){
		this.setState({
		  buttonState: "open"
		})
	}

    return (
		<div class="MiniCardBody">
			<div class="CardItems" style={{width: "60%"}}>
				<div class="CardItem">
	                <div class="CardBodyTextCentered">
	                    water valve is
	                    <span class="CardBodyTextCenteredHighlight"> {this.props.valve}</span>
	                </div>
					<RectangularButton text={this.state.buttonState} width={100} buttonClickHandler={this.handleValveButtonClick}/>
				</div>
			</div>
		</div>
    )
  }
}

export default WaterValveCard