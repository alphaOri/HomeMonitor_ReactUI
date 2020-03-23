import React, { Component, PureComponent } from 'react';
import './dashboard.css';
import '../fonts/material-design-icons/iconfont/material-icons.css'

//required props: units
//optional props: value
export class DisplayValueSeparateUnits extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  shouldComponentUpdate(nextProps){
    if(nextProps.value == null || (nextProps.value == this.props.value)){
      console.log("DisplayValueSeparateUnits:shouldComponentUpdate:return false")
      return false;
    }
    console.log("DisplayValueSeparateUnits:shouldComponentUpdate:return true")
   return true;
  }

  render() {
    console.log("DisplayValueSeparateUnits.js:render(): ")
    console.log(this.props)

    var value = (this.props.value == null) ? '---' : this.props.value;

    return (
      <React.Fragment>
        {value}
        <div class="CardBodyUnits">
          {' '}{this.props.units}
        </div>
      </React.Fragment>
    );
  }
}

//required props: disabled, units
//optional props: value
export class DisplayValueAndUnits extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  shouldComponentUpdate(nextProps){
    if((nextProps.value == null) || (nextProps.value == this.props.value)){
      console.log("DisplayValueAndUnits:shouldComponentUpdate:return false")
      return false;
    }
    console.log("DisplayValueAndUnits:shouldComponentUpdate:return true")
    return true;
  }

  render() {
    console.log("DisplayValueAndUnits.js:render(): ")
    console.log(this.props)

    if(!this.props.disable) {
      var value = (this.props.value == null) ? '--' : this.props.value;

      return (
        <React.Fragment>
          {this.props.value}{this.props.units}
        </React.Fragment>
      ); 
    }

    return (null);
  }
}

//required props: label, units
//optional props: value, separateUnits
//Notes: this is a wrapper and will pass null props down
export class DisplayColumn extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    console.log("DisplayColumn.js:render(): ")
    console.log(this.props)

    if(this.props.separateUnits){
      return (
        <div class="DisplayColumn">
            <div class="CardBodyText">
                {this.props.label}
            </div>
            <div class="ValueDisplay">
                <DisplayValueSeparateUnits value={this.props.value} units={this.props.units}/>
            </div>
        </div>
      );
    }

    return (
      <div class="DisplayColumn">
          <div class="CardBodyText">
              {this.props.label}
          </div>
          <div class="ValueDisplay">
              <DisplayValueAndUnits value={this.props.value} units={this.props.units}/>
          </div>
      </div>
    );
  }
}
