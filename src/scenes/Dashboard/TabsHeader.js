import React from 'react';
import './dashboard.css';
import '../fonts/material-design-icons/iconfont/material-icons.css'

function TabsHeader(props) {
	var backgroundColor
	return (
		<div class="TabBar">
			{props.tabList.map((tab, index) => {
				backgroundColor = {backgroundColor: props.defaultColor}
				if(tab === props.currentTab){
					backgroundColor = {backgroundColor: props.highlightColor}
				}		    	
				return <Tab text={tab} style={backgroundColor} tabClickHandler={props.tabClickHandler} />
		    }
		    )}
		</div>
	);
}

function Tab(props) {
	return (
		<div class="Tab" style={props.style} onClick={() => {props.tabClickHandler(props.text)}}>
			<div class="CardBodyText">
				{props.text}
			</div>
		</div>
	);
}

export default TabsHeader
