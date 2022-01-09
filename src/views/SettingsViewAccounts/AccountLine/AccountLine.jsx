import React, { Component } from 'react';

import './AccountLine.css';

import { RiLogoutBoxLine } from 'react-icons/ri';
import { AiFillStar } from 'react-icons/ai';

const uuidRX = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

export class AccountLine extends Component {
	render() {
		let uuid = '';
		uuid = this.props.uuid;
		return (
			<div className='accountLine'>
				<img
					alt={uuid}
					className={`accountFaceLine ${this.props.isActive ? 'activeFaceLine' : ''}`}
					src={
						uuidRX.test(this.props.uuid)
							? `https://crafatar.com/avatars/${this.props.uuid}?overlay`
							: require('../../../assets/creeper_face.png').default
					}
				/>
				<span className='accountLineUsername'>{this.props.username}</span>

				<span
					className='logOutLine'
					onClick={async () => {
						await window.api.accounts.removeAccount(uuid);
					}}
				>
					<RiLogoutBoxLine />
				</span>
				<span className={`defaultStarLine ${this.props.default ? '' : 'hidden'}`}>
					<AiFillStar />
				</span>
			</div>
		);
	}
}

export default AccountLine;
