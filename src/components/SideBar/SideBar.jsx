import React, { Component } from 'react';
import Account from './Account/AccountFace';
import { FaCog } from 'react-icons/fa';

import './SideBar.css';
import AddAccount from './Account/AccountAdd';
import { Link } from 'react-router-dom';

class SideBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			accounts: [],
			activeAccount: window.api.accounts.getActiveAccount(),
			ctrlHeld: false,
		};

		this.ctrlFunctionDown = this.ctrlFunctionDown.bind(this);
		this.ctrlFunctionUp = this.ctrlFunctionUp.bind(this);
	}
	async componentDidMount() {
		let accounts = await window.api.accounts.findAccounts();
		accounts.sort((a, b) => (a.lastUsed > b.lastUsed ? -1 : 1));

		const self = this;
		self.setState({ accounts: accounts });

		document.addEventListener('keydown', this.ctrlFunctionDown, false);
		document.addEventListener('keyup', this.ctrlFunctionUp, false);
		window.api.receive('accountChange', async function (arg) {
			setTimeout(async function () {
				let accounts = await window.api.accounts.findAccounts();
				accounts.sort((a, b) => (a.lastUsed > b.lastUsed ? -1 : 1));
				self.setState({ accounts: accounts });
			}, 500);
		});
	}

	ctrlFunctionDown(event) {
		if (event.keyCode === 17) {
			//Do whatever when esc is pressed
			this.setState({ ctrlHeld: true });
		}
	}

	ctrlFunctionUp(event) {
		if (event.keyCode === 17) {
			//Do whatever when esc is pressed
			this.setState({ ctrlHeld: false });
		}
	}

	componentWillUnmount() {
		document.removeEventListener('keydown', this.ctrlFunctionDown, false);
		document.removeEventListener('keyup', this.ctrlFunctionUp, false);
	}

	setActive(uuid) {
		this.setState({ activeAccount: uuid });

		if (this.state.ctrlHeld) {
			window.api.accounts.setDefaultAccount(uuid, true);
		} else {
			window.api.accounts.setActiveAccount(uuid);
		}
	}

	render() {
		return (
			<div className='SideBar'>
				<div className='accountsBar'>
					{this.state.accounts.map((acc) => {
						return (
							<Link key={acc.uuid} to='/' replace>
								<div key={acc.uuid} onClick={() => this.setActive(acc.uuid)}>
									<Account id={acc.uuid} key={acc.uuid} uuid={acc.uuid} activeAccount={this.state.activeAccount} />
								</div>
							</Link>
						);
					})}
					<AddAccount />
				</div>

				<Link to='/settings' replace>
					<div className={`settingsCog`}>
						<FaCog />
					</div>
				</Link>
			</div>
		);
	}
}

export default SideBar;
