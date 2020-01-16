import React, { Component } from 'react'

class RectangularButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  shouldComponentUpdate(nextProps){
  	if(nextProps.text == null){
  		//console.log("RectangularButton:shouldComponentUpdate:return false")
  		return false
  	}
  	//console.log("RectangularButton:shouldComponentUpdate:return true")
	  return true
  }

  render() {
  	//console.log("RectangularButton:render(): " )
  	//console.log(this.props)

  	return (
        <button class="RectangularButton" onClick={() => {this.props.buttonClickHandler(this.props.text)}}>
            <div class="CardBodyTextCenteredHighlight">
                {this.props.text}
            </div>
        </button> 
  	)
  }
}

export default RectangularButton