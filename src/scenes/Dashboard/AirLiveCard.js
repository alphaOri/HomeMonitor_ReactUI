import React, { Component } from 'react'
import './dashboard.css'
import '../fonts/material-design-icons/iconfont/material-icons.css'
import uibuilder from '../../libs/uibuilder/uibuilderfe.js'
import DisplayValue from './LittleBits.js'

class AirLiveCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
  	//console.log("AirLiveCard - componentDidMount()")
  	// request historical data
  	uibuilder.send({'topic':'air','payload': {liveCard: 'initialize'}})
  }

  shouldComponentUpdate(nextProps){
  	if(nextProps.liveData == null){
  		//console.log("AirLiveCard:shouldComponentUpdate:return false")
  		return false
  	}
  	//console.log("AirLiveCard:shouldComponentUpdate:return true")
	return true
  }

  render() {
  	//console.log("AirLiveCard.js:render(): ")
  	//console.log(this.props)

	if (this.props.liveData == null) {
	    return (
			<div class="CardBody">
				<div class="CardItems" style={{width: "75%"}}>
					<div class="CardItem">
						<div class="CardBodyTextCentered">
							No Data...
						</div>
					</div>
				</div>
			</div>
	    ) 
	}

    return (
		<div class="CardBody">
	        <div class="CardItems" style="width: 95%">
	            {/* temperature */}
	            <div class="CardItem">
	                <div class="CircleRectangleButtons">
	                    <div class="CircleButton">
	                        <div class="Circle">
	                            <div class="CircleIcon">
	                                <i class="icon-iconmonstr-weather-134-1"></i>
	                            </div>
	                        </div>
	                        <svg class="AroundCircleSvg" viewBox="0 0 3.415 17.462"><path d="M.016 0a12.965 12.965 0 013.4 8.731V0zm3.4 8.731A12.965 12.965 0 010 17.463h3.415z"/></svg>
	                    </div>
	                    <div class="RectangleButton"><i class="material-icons md-44">expand_more</i></div>
	                    <div class="RectangleDisplay">
	                        <div class="ValueDisplay">
	                            68&#176
	                        </div>
	                    </div>
	                    <div class="RectangleButton"><i class="material-icons md-44">expand_less</i></div>
	                    <div class="RectangleButton" style="margin:6px;width:120px;">
	                        <div class="ValueDisplay">
	                            temporary
	                        </div>
	                    </div>
	                </div>
	                <div class="DisplayContainer">
	                    <div class="DisplayColumn">
	                        <div class="CardBodyText">
	                            in
	                        </div>
	                        <div class="ValueDisplay">
	                            68&#176
	                        </div>
	                    </div>
	                    <div class="DisplayColumn">
	                        <div class="CardBodyText">
	                            out
	                        </div>
	                        <div class="ValueDisplay">
	                            81&#176
	                        </div>
	                    </div>
	                </div>
	            </div>
	            {/* humidity */}
	            <div class="CardItem">
	                <div class="CircleRectangleButtons">
	                    <div class="CircleButton">
	                        <div class="Circle">
	                            <div class="CircleIcon">
	                                <i class="icon-iconmonstr-drop-21"></i>
	                            </div>
	                        </div>
	                        <svg class="AroundCircleSvg" viewBox="0 0 3.415 17.462"><path d="M.016 0a12.965 12.965 0 013.4 8.731V0zm3.4 8.731A12.965 12.965 0 010 17.463h3.415z"/></svg>
	                    </div>
	                    <div class="RectangleButton"><i class="material-icons md-44">expand_more</i></div>
	                    <div class="RectangleDisplay">
	                        <div class="ValueDisplay">
	                            45%
	                        </div>
	                    </div>
	                    <div class="RectangleButton"><i class="material-icons md-44">expand_less</i></div>
	                    <div class="CircleButton" style="margin-left:10px;">
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
	                            47%
	                        </div>
	                    </div>
	                    <div class="DisplayColumn">
	                        <div class="CardBodyText">
	                            out
	                        </div>
	                        <div class="ValueDisplay">
	                            62%
	                        </div>
	                    </div>
	                </div>
	            </div>
	            {/* ventilation */}
	            <div class="CardItem">
	                <div class="CircleRectangleButtons">
	                    <div class="CircleButton">
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
	                        <svg class="AroundCircleSvg" viewBox="0 0 3.415 17.462"><path d="M.016 0a12.965 12.965 0 013.4 8.731V0zm3.4 8.731A12.965 12.965 0 010 17.463h3.415z"/></svg>
	                    </div>
	                    <div class="RectangleButton"><i class="material-icons md-44">expand_more</i></div>
	                    <div class="RectangleDisplay">
	                        <div class="ValueDisplay">
	                            1230
	                            <div class="CardBodyUnits">
	                                ppm
	                            </div>
	                        </div>
	                    </div>
	                    <div class="RectangleButton"><i class="material-icons md-44">expand_less</i></div>
	                </div>
	                <div class="DisplayContainer">
	                    <div class="DisplayColumn">
	                        <div class="CardBodyText">
	                            in
	                        </div>
	                        <div class="ValueDisplay">
	                            1114
	                            <div class="CardBodyUnits">
	                                ppm
	                            </div>
	                        </div>
	                    </div>
	                </div>
	            </div>
	        </div>
	    </div>
    )
  }
}

export default AirLiveCard
