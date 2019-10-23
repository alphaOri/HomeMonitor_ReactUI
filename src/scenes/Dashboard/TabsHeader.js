import React, { Component } from 'react';
import './dashboard.css';
import '../fonts/material-design-icons/iconfont/material-icons.css'

function TabsHeader(props) {
	console.log(props)
	return (
		<div class="TabBar">
			{props.tabList.map((tab, index) => (
		        <Tab key={index} text={tab} />
		    ))}
		</div>
	);
}

function Tab(props) {
	return (
		<div class="Tab">
			{props.text}
		</div>
	);
}

export default TabsHeader
