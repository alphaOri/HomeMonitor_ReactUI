import React, { Component } from 'react'

const dayOfWeek = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const monthOfYear = ["January","February","March","April","May","June","July",
            "August","September","October","November","December"]

class HeaderClock extends Component {
  state = {
    time: new Date()
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  tick() {
    this.setState({
      time: new Date()
    })
  }

  render() {
    //console.log("HeaderClock.js:render():")
    return (
      <div> {dayOfWeek[this.state.time.getDay()]}, {monthOfYear[this.state.time.getMonth()]} {this.state.time.getDate()}, {this.state.time.toLocaleTimeString()} </div>
    )
  }
}

export default HeaderClock