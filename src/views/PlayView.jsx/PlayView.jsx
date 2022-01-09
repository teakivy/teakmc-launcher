import React, { Component } from 'react';

import './PlayView.css';

import { FaWindowMinimize } from 'react-icons/fa';
import { IoIosClose } from 'react-icons/io';
import Installation from './Installation/Installation';

import { Link } from 'react-router-dom';

export class PlayView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeInstallation: {
				uuid: '212121',
				name: 'Release 1.18.1',
				root: 'C:/Users/TeakIvy/AppData/Roaming/.minecraft',
				image: 'default',
				version: {
					number: '1.18.1',
					type: 'release',
				},
				ram: {
					min: '1G',
					max: '4G',
				},
				javaPath: 'java',
			},
			username: 'Demo User',
			launching: false,
			launchPercent: 0,
		};
	}

	async componentDidMount() {
		this.setState({
			username: (await window.api.accounts.getAccount(await window.api.accounts.getActiveAccount())).profile.name,
			activeInstallation: await window.api.instances.getInstance(await window.api.instances.getActiveInstance()),
		});

		console.log(this.state);
		const self = this;
		window.api.receive('changeActiveAccount', async function (arg) {
			setTimeout(async function () {
				self.setState({
					username: (await window.api.accounts.getAccount(await window.api.accounts.getActiveAccount())).profile.name,
				});
			}, 500);
		});

		window.api.receive('launchingPercent', async function (arg) {
			if (arg === undefined) return;
			if (arg.status === 'launching') {
				self.setState({
					launching: true,
					launchPercent: arg.percent,
				});
			} else if (arg.status === 'done') {
				setTimeout(async function () {
					self.setState({
						launching: false,
						launchPercent: 0,
					});
				}, 500);
			}
		});
	}

	render() {
		return (
			<div>
				<div className='frame-bar'></div>
				<div className='draggable-bar'></div>

				<div className='selectButtons'>
					<Link to='/' replace>
						<div className='selectButton selectGeneral selectButtonActive'>Play</div>
					</Link>
					<Link to='/installations' replace>
						<div className='selectButton selectInstallation'>Installations</div>
					</Link>
					{/* <Link to='/skins' replace> */}
					<div className='selectButton selectSkins selectDisabled'>Skins</div>
					{/* </Link> */}
				</div>
				<div className='windowControls'>
					<div className='minimizeWindow' onClick={minWindow}>
						<FaWindowMinimize />
					</div>
					<div className='closeWindow' onClick={closeWindow}>
						<IoIosClose />
					</div>
				</div>
				<img alt='backgroundimg' src={require('../../assets/background.png').default} className='launcherBgImg' />

				<img
					alt='mclogo'
					src={require('../../assets/Minecraft_logo.png').default}
					className='launcherMCLogo'
					onClick={openMCWeb}
				/>
				{this.state.launching ? (
					<progress className='launchProgressBar' value={this.state.launchPercent} max='100' />
				) : (
					' '
				)}
				<div className='playBar'>
					<Link key={this.state.activeInstallation.toString()} to='/installations' replace>
						<Installation key={this.state.activeInstallation.toString()} installation={this.state.activeInstallation} />
					</Link>
					<div className='playButton' onClick={launch}>
						<div className='playText'>{this.state.username === 'Player' ? 'Play Demo' : 'Play'}</div>
					</div>
					<div className='playTabUsername'>{this.state.username}</div>
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
	window.api.instances.playInstance(await window.api.instances.getActiveInstance());
}

export default PlayView;
