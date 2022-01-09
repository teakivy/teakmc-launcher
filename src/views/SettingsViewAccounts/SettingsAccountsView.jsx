import React, { Component } from 'react';

import './SettingsAccountsView.css';

import { FaWindowMinimize, FaPlus } from 'react-icons/fa';
import { IoIosClose } from 'react-icons/io';
import AccountLine from './AccountLine/AccountLine';
import AddAccountLine from './AccountLine/AddAccountLine';
import { Link } from 'react-router-dom';

export class PlayView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			accounts: [],
		};
	}

	async componentDidMount() {
		let accounts = await window.api.accounts.findAccounts();
		accounts.sort((a, b) => (a.username > b.username ? 1 : -1));
		this.setState({
			accounts,
		});
		const self = this;

		window.api.receive('accountChange', async function (arg) {
			setTimeout(async function () {
				let accounts = await window.api.accounts.findAccounts();
				accounts.sort((a, b) => (a.username > b.username ? 1 : -1));
				self.setState({ accounts });
			}, 500);
		});
	}

	render() {
		return (
			<div>
				<div className='frame-bar'></div>
				<div className='draggable-bar'></div>

				<div className='selectButtons'>
					<Link to='/settings' replace>
						<div className='selectButton selectGeneral'>General</div>
					</Link>
					<Link to='/settings/accounts' replace>
						<div className='selectButton selectInstallation selectButtonActive'>Accounts</div>
					</Link>
					<Link to='/settings/about' replace>
						<div className='selectButton selectSkins'>About</div>
					</Link>
				</div>
				<div className='windowControls'>
					<div className='minimizeWindow' onClick={minWindow}>
						<FaWindowMinimize />
					</div>
					<div className='closeWindow' onClick={closeWindow}>
						<IoIosClose />
					</div>
				</div>
				<div className='accountsListings'>
					{this.state.accounts.map((account) => {
						return (
							<div key={account.uuid} className='accountLineShow'>
								<AccountLine
									key={account.uuid}
									uuid={account.uuid}
									username={account.username}
									default={account.isDefault}
									active={account.isActive}
								/>
							</div>
						);
					})}
					<span onClick={addAccount}>
						<AddAccountLine />
					</span>
				</div>
			</div>
		);
	}
}

async function addAccount() {
	window.api.accounts.login();
}

function minWindow() {
	window.api.appFunctions.minimize();
}

function closeWindow() {
	window.api.appFunctions.close();
}

export default PlayView;
