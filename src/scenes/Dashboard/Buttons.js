import React, { Component, PureComponent } from 'react'

//required props: text
//optional props:
export class RectangularButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  shouldComponentUpdate(nextProps){
  	if(nextProps.text == null){
  		console.log("RectangularButton:shouldComponentUpdate:return false")
  		return false
  	}
  	console.log("RectangularButton:shouldComponentUpdate:return true")
	  return true
  }

  render() {
  	console.log("RectangularButton:render(): " )
  	console.log(this.props)

  	return (
        <button class="RectangularButton" onClick={() => {this.props.buttonClickHandler(this.props.text)}}>
            <div class="CardBodyTextCenteredHighlight">
                {this.props.text}
            </div>
        </button> 
  	)
  }
}

//required props: icon
//optional props: disable, text, buttonId, highlight, textDisable, buttonClickHandler, bottomPosition, rightPosition
//Notes: parent uses state to keep this component's props valid so we don't need to derive state from props even though this component can change its own state.
export class CircularButton extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      blink: false
    };
  }

  handleButtonClick = (buttonId) =>{
    console.log("CircularButton:handleButtonClick(): ")
    if(this.props.disable !== true){
      clearTimeout(this.buttonBlinkTimer);
      this.setState({ blink: true });
      this.buttonBlinkTimer = setTimeout(() => this.setState({ blink: false }), 250);
      this.props.buttonClickHandler(buttonId);
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

    var textStyle = {}
    if(this.props.bottomPosition && this.props.rightPosition) {
      textStyle = {bottom: `${this.props.bottomPosition}`, right: `${this.props.rightPosition}`}
    }
    var text = this.props.text;
    if(this.props.textDisable){
      text = ""
    }

    return (
        <div class="Circle" style={{backgroundColor: `${this.getColor()}`}} onClick={() => {this.handleButtonClick(this.props.buttonId)}}>
            <div class="CircleIcon">
                <i class={this.props.icon}></i>
            </div>
            <div class="CircleText" style={textStyle}>
                <div class="CardBodyTextCenteredHighlight">
                    {text}
                </div>
            </div>
        </div>
      )
  }
}

//required props:
//optional props: disable, left, right, flip
//Notes: props are hardcoded in parent of this component, so props are always valid
export class CircleTrim extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    console.log("CircleTrim:render():" )
    console.log(this.props)

    var style = {};
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

    return (
        <svg class="AroundCircleSvg" style={style} viewBox="0 0 3.415 17.462">
          <path d="M.016 0a12.965 12.965 0 013.4 8.731V0zm3.4 8.731A12.965 12.965 0 010 17.463h3.415z"/>
        </svg>
      )
  }
}

//required props: icon
//optional props: disable, highlight, buttonId
//Notes: props are hardcoded in parent of this component, so props are always valid
export class SquareButton extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      blink: false
    };
  }

  handleButtonClick = (buttonId) =>{
    console.log("SquareButton:handleButtonClick(): ")
    if(this.props.disable !== true){
      clearTimeout(this.buttonBlinkTimer);
      this.setState({ blink: true });
      this.buttonBlinkTimer = setTimeout(() => this.setState({ blink: false }), 250);
      this.props.buttonClickHandler(buttonId);
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
      <div class="RectangleButton" style={{backgroundColor: `${this.getColor()}`}} onClick={() => {this.handleButtonClick(this.props.buttonId)}}>
        <i class="material-icons md-42">{this.props.icon}</i>
      </div>
    )
  }
}