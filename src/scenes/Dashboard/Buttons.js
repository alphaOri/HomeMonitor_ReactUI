import React, { Component } from 'react'

export class RectangularButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  compo

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

export class CircularButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blink: false
    };
  }

  shouldComponentUpdate(nextProps, nextState){
    if((nextProps == null) && (this.state === nextState)){
      console.log("CircularButton:shouldComponentUpdate:return false")
      return false
    }
    console.log("CircularButton:shouldComponentUpdate:return true")
    return true
  }

  handleButtonClick = () =>{
    console.log("CircularButton:handleButtonClick(): ")
    if(this.props.disable !== true){
      clearTimeout(this.buttonBlinkTimer);
      this.setState({ blink: true });
      this.buttonBlinkTimer = setTimeout(() => this.setState({ blink: false }), 250);
      this.props.buttonClickHandler();
    }
  }

  componentWillUnmount() {
    clearTimeout(this.buttonBlinkTimer);
  }

  getColor = () => {
    if(this.props.disable == true){
      return "var(--text-background-highlight-dark)";
    } else if((this.state.blink == true)||(this.props.highlight == true)) {
      return "var(--button-highlight-color)";
    }
    return "var(--button-color)";
  }

  render() {
    console.log("CircularButton:render():" )
    console.log(this.props)

    var textStyle = ""
    if(this.props.bottomPosition && this.props.rightPosition) {
      textStyle = {bottom: `${this.props.bottomPosition}`, right: `${this.props.rightPosition}`}
    }

    return (
        <div class="Circle" style={{backgroundColor: `${this.getColor()}`}} onClick={() => {this.handleButtonClick()}}>
            <div class="CircleIcon">
                <i class={this.props.icon}></i>
            </div>
            <div class="CircleText" style={textStyle}>
                <div class="CardBodyTextCenteredHighlight">
                    {this.props.text}
                </div>
            </div>
        </div>
      )
  }
}

/*export class CircleTrim extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    console.log("CircleButton:render():" )
    console.log(this.props)

    var style = {left: "-7px"};
    //style.left = "-7px";
    if(this.props.disable) {
      style.fill = "var(--text-background-highlight-dark)";
    }
    if(this.props.left) {
      style.left = this.props.left;
      style.right = "unset";
    } else if (this.props.right){
      style.left = "unset";
      style.right = this.props.right;
    }
    if(this.props.flip) {
      style.transform = "scale(-1,1)";
    }
    console.log(style)

    return (
        <svg class="AroundCircleSvg" style={{left: "-7px"}} viewBox="0 0 3.415 17.462">
          <path d="M.016 0a12.965 12.965 0 013.4 8.731V0zm3.4 8.731A12.965 12.965 0 010 17.463h3.415z"/>
        </svg>
      )
  }
}*/

export class SquareButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blink: false
    };
  }

  shouldComponentUpdate(nextProps, nextState){
    if((nextProps == null) && (this.state === nextState)){
      console.log("SquareButton:shouldComponentUpdate:return false")
      return false
    }
    console.log("SquareButton:shouldComponentUpdate:return true")
    return true
  }

  handleButtonClick = (type) =>{
    console.log("SquareButton:handleButtonClick(): ")
    if(this.props.disable !== true){
      clearTimeout(this.buttonBlinkTimer);
      this.setState({ blink: true });
      this.buttonBlinkTimer = setTimeout(() => this.setState({ blink: false }), 250);
      this.props.buttonClickHandler(type);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.buttonBlinkTimer);
  }

  getColor = () => {
    if(this.props.disable == true){
      return "var(--text-background-highlight-dark)";
    } else if((this.state.blink == true)||(this.props.highlight == true)) {
      return "var(--button-highlight-color)";
    }
    return "var(--button-color)";
  }

  render() {
    console.log("SquareButton:render():" )
    console.log(this.props)

    return (
      <div class="RectangleButton" style={{backgroundColor: `${this.getColor()}`}} onClick={() => {this.handleButtonClick(this.props.type)}}>
        <i class="material-icons md-42">{this.props.icon}</i>
      </div>
    )
  }
}