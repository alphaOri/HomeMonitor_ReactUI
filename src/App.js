import React, { Component } from 'react';
import './App.css';
import UserData from './scenes/UserData'


class App extends Component {
  render() {
  	console.log("App.js:render(): ")
	return (
		<UserData />
	);
  }
}
export default App;
