import React from 'react';
import './dashboard.css';
import '../fonts/material-design-icons/iconfont/material-icons.css'

function CardHeader(props) {
	return (
		<div class="CardBar">
			<div class="CardBarTitle">
				{props.title}
			</div>
			<div class="CardBarRight">
				<i class="material-icons md-36" onClick={() => {props.fullscreenClick(props.type)}}>fullscreen</i>
			</div>
		</div>
	);
}

export default CardHeader
