import React, { Component } from 'react';

import './AddAccountLine.css';

import { FaPlus } from 'react-icons/fa';

const uuidRX = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

let uuid = '';
export class AccountLine extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		uuid = this.props.uuid;
	}

	render() {
		return (
			<div className='accountAddLine'>
				{/* <img
					className={`accountFaceLine ${this.props.isActive ? 'activeFaceLine' : ''}`}
					src={
						uuidRX.test(this.props.uuid)
							? `https://crafatar.com/avatars/${this.props.uuid}?overlay`
							: require('../../../assets/creeper_face.png')
					}
				/> */}
				<div className='accountFaceLine'>
					<div className='faPlus'>
						<FaPlus />
					</div>
				</div>
				<span className='accountLineText'>Add Account</span>
			</div>
		);
	}
}

export default AccountLine;
