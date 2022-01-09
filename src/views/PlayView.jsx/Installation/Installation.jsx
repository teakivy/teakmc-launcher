import React, { Component } from 'react';

import './Installation.css';

export class Installation extends Component {
	render() {
		return (
			<div className='installation'>
				{this.props.installation !== undefined ? (
					<div className='installationHL'>
						<img
							className='installationImg'
							alt='default'
							src={
								require(`../../../assets/installations/${this.props.installation.image}.png`).default ||
								require('../../../assets/installations/default.png').default
							}
						/>
						<span className='installationTitle'>{this.props.installation.name || 'New Installation'}</span>
					</div>
				) : (
					''
				)}
			</div>
		);
	}
}

export default Installation;
