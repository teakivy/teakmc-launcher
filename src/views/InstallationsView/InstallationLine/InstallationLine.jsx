import React, { Component } from 'react';

import './InstallationLine.css';

import { Link } from 'react-router-dom';

import { BsFillPlayFill } from 'react-icons/bs';
import { MdModeEditOutline } from 'react-icons/md';
import { AiFillDelete } from 'react-icons/ai';

export class InstallationLine extends Component {
	constructor(props) {
		super(props);

		this.state = {
			installation: {},
			uuid: '-',
			name: 'New Installation',
			image: 'default',
		};
	}

	async componentDidMount() {
		let ins = await this.props.installation.installation;
		this.setState({
			installation: await ins,
			uuid: await ins.uuid,
			name: await ins.name,
			image: await ins.image,
		});
	}

	render() {
		let self = this;
		return (
			<div className={`installationLine ${this.props.active ? 'activeInstallationLine' : ''}`}>
				<img
					src={
						require(`../../../assets/installations/${this.state.image}.png`).default ||
						require(`../../../assets/installations/default.png`).default
					}
					alt='Default'
					className='installationImage'
				/>
				<span className='installationText'>{this.state.name}</span>

				<span className='installationOptions'>
					<span
						className='playInstallation installationOption'
						onClick={() => {
							window.api.instances.playInstance(self.state.uuid);
						}}
					>
						<BsFillPlayFill />
					</span>
					<Link
						to={{
							pathname: '/installations/add',
							state: {
								ins: this.state.installation,
							},
						}}
					>
						<span className='editInstallation installationOption'>
							<MdModeEditOutline />
						</span>
					</Link>

					<span
						className='deleteInstallation installationOption'
						onClick={async () => {
							await window.api.instances.deleteInstance(self.state.uuid);
						}}
					>
						<AiFillDelete />
					</span>
				</span>
			</div>
		);
	}
}

export default InstallationLine;
