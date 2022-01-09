import React, { Component } from 'react';

import './SettingsView.css';

import { FaWindowMinimize } from 'react-icons/fa';
import { IoIosClose } from 'react-icons/io';

import { Link } from 'react-router-dom';

export class PlayView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			keepLauncherOpen: false,
			resetToDefaultAccount: false,
			shiftPromptSignIn: false,
			openLogOnStart: false,
			key1: Math.random(),
			key2: Math.random(),
			key3: Math.random(),
			key4: Math.random(),
		};
	}

	async componentDidMount() {
		let keepLauncherOpen = (await window.api.config.get('keepLauncherOpen')) || false;
		let resetToDefaultAccount = (await window.api.config.get('resetToDefaultAccount')) || false;
		let shiftPromptSignIn = (await window.api.config.get('shiftPromptSignIn')) || false;
		let openLogOnStart = (await window.api.config.get('openLogOnStart')) || false;

		// if (keepLauncherOpen != true && keepLauncherOpen != false) keepLauncherOpen = false;
		this.setState({
			keepLauncherOpen: keepLauncherOpen,
			resetToDefaultAccount: resetToDefaultAccount,
			shiftPromptSignIn: shiftPromptSignIn,
			openLogOnStart: openLogOnStart,
			key1: Math.random(),
			key2: Math.random(),
			key3: Math.random(),
			key4: Math.random(),
		});
	}

	// async changeVal(val) {
	// 	console.log('ss');
	// 	console.log(!self.state[val]);
	// 	self.setState({ [val]: !self.state[val] });
	// 	await window.api.config.set(val, self.state[val]);
	// }

	render() {
		return (
			<div>
				<div className='frame-bar'></div>
				<div className='draggable-bar'></div>

				<div className='selectButtons'>
					<Link to='/settings' replace>
						<div className='selectButton selectGeneral selectButtonActive'>General</div>
					</Link>
					<Link to='/settings/accounts' replace>
						<div className='selectButton selectInstallation'>Accounts</div>
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
				<div className='settings'>
					<div className='settingsSectionLauncher'>
						<div className='settingsTitle launcherSectionTitle'>Launcher Settings</div>
						<div className='selectOption'>
							<label className='container'>
								Keep the Launcher open while games are running
								<input
									key={this.state.key1}
									type='checkbox'
									onChange={(e) => {
										window.api.config.set('keepLauncherOpen', e.target.checked);
									}}
									defaultChecked={this.state.keepLauncherOpen}
								/>
								<span className='checkmark'></span>
							</label>
							<label className='container'>
								Reset to the Default Account when the Launcher opens
								<input
									key={this.state.key2}
									type='checkbox'
									onChange={(e) => {
										window.api.config.set('resetToDefaultAccount', e.target.checked);
									}}
									defaultChecked={this.state.resetToDefaultAccount}
								/>
								<span className='checkmark'></span>
							</label>
							<label className='container'>
								Hold Shift while launching to prompt Minecraft Log-In
								<input
									key={this.state.key3}
									type='checkbox'
									onChange={(e) => {
										window.api.config.set('shiftPromptSignIn', e.target.checked);
									}}
									defaultChecked={this.state.shiftPromptSignIn}
								/>
								<span className='checkmark'></span>
							</label>
						</div>
					</div>
					<div className='settingsSeperator' />
					<div className='settingsSectionMinecraft'>
						<div className='settingsTitle minecraftSectionTitle'>Minecraft Settings</div>
						<label className='container'>
							Open output log when Minecraft starts
							<input
								key={this.state.key4}
								type='checkbox'
								onChange={(e) => {
									window.api.config.set('openLogOnStart', e.target.checked);
								}}
								defaultChecked={this.state.openLogOnStart}
							/>
							<span className='checkmark'></span>
						</label>
					</div>
				</div>
			</div>
		);
	}
}

function openMCWeb() {
	window.api.openInBrowser('http://minecraft.net');
}

function minWindow() {
	window.api.appFunctions.minimize();
}

function closeWindow() {
	window.api.appFunctions.close();
}

async function launch() {
	window.api.launch(await window.api.accounts.getActiveAccount());
}

export default PlayView;
