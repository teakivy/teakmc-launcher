import React, { Component } from 'react';

import './AccountFace.css';

const uuidRX = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

class Account extends Component {
	render() {
		return (
			<div>
				<img
					width={37.5}
					className={`avatar ${this.props.uuid === this.props.activeAccount ? 'avatar-active' : ''}`}
					src={
						uuidRX.test(this.props.uuid)
							? `https://crafatar.com/avatars/${this.props.uuid}?overlay`
							: require('../../../assets/creeper_face.png').default
					}
					alt={this.props.uuid}
				></img>
			</div>
		);
	}
}

export default Account;
