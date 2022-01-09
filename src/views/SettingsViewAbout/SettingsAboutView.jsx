import React, { Component } from 'react';

import './SettingsAboutView.css';

import { FaWindowMinimize } from 'react-icons/fa';
import { IoIosClose } from 'react-icons/io';
import { MdOpenInNew } from 'react-icons/md';
import { Link } from 'react-router-dom';

export class PlayView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			osVersion: 'Waiting for Version...',
			launcherVersion: 'Waiting for Version...',
		};
	}

	async componentDidMount() {
		this.setState({
			osVersion: await window.api.version.getOSVersion(),
			launcherVersion: await window.api.version.getLauncherVersion(),
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
						<div className='selectButton selectInstallation'>Accounts</div>
					</Link>
					<Link to='/settings/about' replace>
						<div className='selectButton selectSkins selectButtonActive'>About</div>
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
						<div className='settingsTitle'>Launcher</div>
						<div className='selectOption'>
							<label className='container textContainer' onClick={() => copy(this.state.osVersion)}>
								<b>OS Version: </b>
								{this.state.osVersion}
							</label>
							<label className='container textContainer' onClick={() => copy(this.state.launcherVersion)}>
								<b>Launcher Version: </b>
								{this.state.launcherVersion}
							</label>
						</div>
					</div>
					<div className='settingsSeperator settingsSeperatorCredits' />
					<div className='settingsSectionMinecraft'>
						<div className='settingsTitle minecraftSectionTitle'>Credits</div>
						<label className='container containerInfo textContainer'>
							Launcher Created by{' '}
							<span className='linkOpen' onClick={openTeakTwitter}>
								TeakIvy{' '}
								<span className='linkOpenIcon'>
									<MdOpenInNew />
								</span>
							</span>
							<br />
							<br />
							Thanks to these people for their work & help in making the Launcher:
							<br /> - Hanro50 - MSMC Package
							<br /> - Pierce - Minecraft Launcher Core Package
							<br /> - The_mi_ma - Designs & Inspiration
							<br /> - DixieRose - Inspiration & Ideas
						</label>
					</div>
					<div className='settingsSeperator settingsSeperatorContribute' />
					<div className='settingsSectionMinecraft'>
						<div className='settingsTitle minecraftSectionTitle'>Contributing</div>
						<label className='container containerInfo textContainer'>
							<b>
								Found a Bug? Want to contribute to the Launcher? Just want to make
								<br /> your own launcher and forget about us?
							</b>
							<br />
							<div className='githubSection'>
								Check our{' '}
								<span className='linkOpen' onClick={openGithubProject}>
									GitHub{' '}
									<span className='linkOpenIcon'>
										<MdOpenInNew />
									</span>
								</span>{' '}
								Page!
							</div>
						</label>
					</div>
				</div>
			</div>
		);
	}
}

function openTeakTwitter() {
	window.api.openInBrowser('http://twitter.com/TeakIvyYT');
}

function openGithubProject() {
	window.api.openInBrowser('http://github.com/teakivy');
}

function minWindow() {
	window.api.appFunctions.minimize();
}

function closeWindow() {
	window.api.appFunctions.close();
}

function copy(text) {
	window.api.copyText(text);
}

export default PlayView;
