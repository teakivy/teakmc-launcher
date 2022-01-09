import React, { Component } from 'react';

import { FaPlus } from 'react-icons/fa';

import './AccountAdd.css';

class AddAccount extends Component {
	render() {
		return (
			<div className='accountAdd'>
				<div className='plusAccount' onClick={addAccount}>
					<FaPlus />
				</div>
			</div>
		);
	}
}

async function addAccount() {
	window.api.accounts.login();
}

export default AddAccount;
