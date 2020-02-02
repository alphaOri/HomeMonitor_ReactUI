import React, { Component } from 'react'
import uibuilder from '../../libs/uibuilder/uibuilderfe.js'

class WaterPressureCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
  	//console.log("WaterPressureCard - componentDidMount()")
  	// request pressure reading
  	uibuilder.send({'topic':'water','payload': {pressure: 'initialize'}})
  }

  shouldComponentUpdate(nextProps){
  	if(nextProps.pressure == null){
  		//console.log("WaterPressureCard:shouldComponentUpdate:return false")
  		return false
  	}
  	//console.log("WaterPressureCard:shouldComponentUpdate:return true")
	return true
  }

  render() {
  	//console.log("WaterPressureCard.js:render(): ")
  	//console.log(this.props)

	if (this.props.pressure == null) {
	    return (
            <div class="MiniCardBody">
                <div class="CardItems" style={{width: "55%"}}>
                    <div class="CardItem">
                        <div class="CardBodyText">
                            water pressure
                        </div>
                        <span class="CardBodyTextCenteredHighlight"> ...</span>
                    </div>
                </div>
            </div>
	    ) 
	}

    return (
    	<div class="MiniCardBody">
            <div class="CardItems" style={{width: "55%"}}>
                <div class="CardItem">
                    <div class="CardBodyText">
                        water pressure
                    </div>
                    <div class="CardBodyTextHighlight">
                        {this.props.pressure}
                        <div class="CardBodyUnits">
                            &nbsp;psi
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
  }
}

export default WaterPressureCard