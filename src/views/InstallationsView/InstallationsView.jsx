import React, { Component } from 'react';

import './InstallationsView.css';

import { FaWindowMinimize } from 'react-icons/fa';
import { IoIosClose } from 'react-icons/io';
import { Link } from 'react-router-dom';
import InstallationLine from './InstallationLine/InstallationLine';
import { v4 as uuidv4 } from 'uuid';

let self;
export class PlayView extends Component {
	constructor(props) {
		super(props);
		self = this;
		this.state = {
			installations: [],
			activeInstallation: undefined,
		};

		this.setActiveInstallation = this.setActiveInstallation.bind(this);
	}

	async componentDidMount() {
		let inss = await window.api.instances.findInstances();
		self = this;

		this.setState({
			installations: inss.sort((a, b) => (a.lastUsed > b.lastUsed ? -1 : 1)),
			activeInstallation: await window.api.instances.getActiveInstance(),
		});
	}

	async setActiveInstallation(uuid) {
		this.setState({ activeInstallation: uuid });
		window.api.instances.setActiveInstance(uuid);
	}

	render() {
		return (
			<div>
				<div className='frame-bar'></div>
				<div className='draggable-bar'></div>
				<div className='selectButtons'>
					<Link to='/' replace>
						<div className='selectButton selectGeneral'>Play</div>
					</Link>
					<Link to='/installations' replace>
						<div className='selectButton selectInstallation selectButtonActive'>Installations</div>
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
				<Link
					to={{
						pathname: '/installations/add',
						state: {
							ins: {
								uuid: uuidv4(),
								name: '',
								image: 'default',
								root: '',
								version: {
									number: '1.18.1',
									type: 'release',
								},
								ram: {
									min: '1G',
									max: '2G',
								},
								javaPath: '',
							},
						},
					}}
				>
					<span className='newInstallationButton'>New Installation</span>
				</Link>
				<div className='installationArea'>
					{this.state.installations.map((ins) => (
						<div
							key={ins.uuid}
							onClick={() => {
								self.setActiveInstallation(ins.uuid);
							}}
						>
							<InstallationLine
								installation={{
									installation: ins,
								}}
								key={ins.uuid}
								active={this.state.activeInstallation === ins.uuid}
							/>
						</div>
					))}
				</div>
			</div>
		);
	}
}
function minWindow() {
	window.api.appFunctions.minimize();
}

function closeWindow() {
	window.api.appFunctions.close();
}

export default PlayView;
