import React, { Component } from 'react';
import './App.css';
import UserData from './scenes/UserData'


class App extends Component {
  render() {
  	console.log("App.js")
	return (
		<UserData title="User Data" />
	);
  }
}
export default App;
