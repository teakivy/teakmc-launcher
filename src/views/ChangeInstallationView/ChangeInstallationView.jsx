import React, { Component } from 'react';
import { FaWindowMinimize } from 'react-icons/fa';
import { IoIosClose } from 'react-icons/io';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { v4 as uuidv4 } from 'uuid';

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import './ChangeInstallationView.css';
const options = [
	{
		value: 'default',
		label: (
			<span key={1}>
				<img key={3} src={require('../../assets/installations/default.png').default} width={30} className='imgOptImg' />{' '}
				<span className='imgOptTitle'>Default</span>
			</span>
		),
	},
	{
		value: 'optifine',
		label: (
			<span key={1}>
				<img
					key={3}
					src={require('../../assets/installations/optifine.png').default}
					width={30}
					className='imgOptImg'
				/>{' '}
				<span className='imgOptTitle'>Optifine</span>
			</span>
		),
	},
];

const verOptions = [
	{
		value: { number: '1.18.1', type: 'release' },
		label: <span className='verOptTitle'>1.18.1</span>,
	},
	{
		value: { number: '1.18', type: 'release' },
		label: <span className='verOptTitle'>1.18</span>,
	},
	{
		value: { number: '1.17.1', type: 'release' },
		label: <span className='verOptTitle'>1.17.1</span>,
	},
	{
		value: { number: '1.17', type: 'release' },
		label: <span className='verOptTitle'>1.17</span>,
	},
	{
		value: { number: '1.16.5', type: 'release' },
		label: <span className='verOptTitle'>1.16.5</span>,
	},
	{
		value: { number: '1.16.4', type: 'release' },
		label: <span className='verOptTitle'>1.16.4</span>,
	},
	{
		value: { number: '1.16.3', type: 'release' },
		label: <span className='verOptTitle'>1.16.3</span>,
	},
	{
		value: { number: '1.16.2', type: 'release' },
		label: <span className='verOptTitle'>1.16.2</span>,
	},
	{
		value: { number: '1.16.1', type: 'release' },
		label: <span className='verOptTitle'>1.16.1</span>,
	},
	{
		value: { number: '1.16', type: 'release' },
		label: <span className='verOptTitle'>1.16</span>,
	},
	{
		value: { number: '1.15.2', type: 'release' },
		label: <span className='verOptTitle'>1.15.2</span>,
	},
	{
		value: { number: '1.15.1', type: 'release' },
		label: <span className='verOptTitle'>1.15.1</span>,
	},
	{
		value: { number: '1.15', type: 'release' },
		label: <span className='verOptTitle'>1.15</span>,
	},
	{
		value: { number: '1.14.4', type: 'release' },
		label: <span className='verOptTitle'>1.14.4</span>,
	},
	{
		value: { number: '1.14.3', type: 'release' },
		label: <span className='verOptTitle'>1.14.3</span>,
	},
	{
		value: { number: '1.14.2', type: 'release' },
		label: <span className='verOptTitle'>1.14.2</span>,
	},
	{
		value: { number: '1.14.1', type: 'release' },
		label: <span className='verOptTitle'>1.14.1</span>,
	},
	{
		value: { number: '1.14', type: 'release' },
		label: <span className='verOptTitle'>1.14</span>,
	},
	{
		value: { number: '1.13.2', type: 'release' },
		label: <span className='verOptTitle'>1.13.2</span>,
	},
	{
		value: { number: '1.13.1', type: 'release' },
		label: <span className='verOptTitle'>1.13.1</span>,
	},
	{
		value: { number: '1.13', type: 'release' },
		label: <span className='verOptTitle'>1.13</span>,
	},
	{
		value: { number: '1.12.2', type: 'release' },
		label: <span className='verOptTitle'>1.12.2</span>,
	},
	{
		value: { number: '1.12.1', type: 'release' },
		label: <span className='verOptTitle'>1.12.1</span>,
	},
	{
		value: { number: '1.12', type: 'release' },
		label: <span className='verOptTitle'>1.12</span>,
	},
	{
		value: { number: '1.11.2', type: 'release' },
		label: <span className='verOptTitle'>1.11.2</span>,
	},
	{
		value: { number: '1.11.1', type: 'release' },
		label: <span className='verOptTitle'>1.11.1</span>,
	},
	{
		value: { number: '1.11', type: 'release' },
		label: <span className='verOptTitle'>1.11</span>,
	},
	{
		value: { number: '1.10.2', type: 'release' },
		label: <span className='verOptTitle'>1.10.2</span>,
	},
	{
		value: { number: '1.10.1', type: 'release' },
		label: <span className='verOptTitle'>1.10.1</span>,
	},
	{
		value: { number: '1.10', type: 'release' },
		label: <span className='verOptTitle'>1.10</span>,
	},
	{
		value: { number: '1.9.4', type: 'release' },
		label: <span className='verOptTitle'>1.9.4</span>,
	},
	{
		value: { number: '1.9.3', type: 'release' },
		label: <span className='verOptTitle'>1.9.3</span>,
	},
	{
		value: { number: '1.9.2', type: 'release' },
		label: <span className='verOptTitle'>1.9.2</span>,
	},
	{
		value: { number: '1.9.1', type: 'release' },
		label: <span className='verOptTitle'>1.9.1</span>,
	},
	{
		value: { number: '1.9', type: 'release' },
		label: <span className='verOptTitle'>1.9</span>,
	},
	{
		value: { number: '1.8.9', type: 'release' },
		label: <span className='verOptTitle'>1.8.9</span>,
	},
	{
		value: { number: '1.8.8', type: 'release' },
		label: <span className='verOptTitle'>1.8.8</span>,
	},
	{
		value: { number: '1.8.7', type: 'release' },
		label: <span className='verOptTitle'>1.8.7</span>,
	},
	{
		value: { number: '1.8.6', type: 'release' },
		label: <span className='verOptTitle'>1.8.6</span>,
	},
	{
		value: { number: '1.8.5', type: 'release' },
		label: <span className='verOptTitle'>1.8.5</span>,
	},
	{
		value: { number: '1.8.4', type: 'release' },
		label: <span className='verOptTitle'>1.8.4</span>,
	},
	{
		value: { number: '1.8.3', type: 'release' },
		label: <span className='verOptTitle'>1.8.3</span>,
	},
	{
		value: { number: '1.8.2', type: 'release' },
		label: <span className='verOptTitle'>1.8.2</span>,
	},
	{
		value: { number: '1.8.1', type: 'release' },
		label: <span className='verOptTitle'>1.8.1</span>,
	},
	{
		value: { number: '1.8', type: 'release' },
		label: <span className='verOptTitle'>1.8</span>,
	},
	{
		value: { number: '1.7.10', type: 'release' },
		label: <span className='verOptTitle'>1.7.10</span>,
	},
	{
		value: { number: '1.7.9', type: 'release' },
		label: <span className='verOptTitle'>1.7.9</span>,
	},
	{
		value: { number: '1.7.8', type: 'release' },
		label: <span className='verOptTitle'>1.7.8</span>,
	},
	{
		value: { number: '1.7.7', type: 'release' },
		label: <span className='verOptTitle'>1.7.7</span>,
	},
	{
		value: { number: '1.7.6', type: 'release' },
		label: <span className='verOptTitle'>1.7.6</span>,
	},
	{
		value: { number: '1.7.5', type: 'release' },
		label: <span className='verOptTitle'>1.7.5</span>,
	},
	{
		value: { number: '1.7.4', type: 'release' },
		label: <span className='verOptTitle'>1.7.4</span>,
	},
	{
		value: { number: '1.7.3', type: 'release' },
		label: <span className='verOptTitle'>1.7.3</span>,
	},
	{
		value: { number: '1.7.2', type: 'release' },
		label: <span className='verOptTitle'>1.7.2</span>,
	},
	{
		value: { number: '1.7.1', type: 'release' },
		label: <span className='verOptTitle'>1.7.1</span>,
	},
	{
		value: { number: '1.7', type: 'release' },
		label: <span className='verOptTitle'>1.7</span>,
	},
];

const customStyles = {
	option: (provided, state) => {
		// console.log(state.getKey());
		return {
			...provided,
			color: state.isSelected ? '#ffffff' : '#ffffff60',
			// padding: 20,
			width: 250,
			backgroundColor: state.isSelected ? '#313136' : '#25252A',
			// color: '#ffffff',
			cursor: 'pointer',
			// boxShadow: '3px 3px 16px 0px rgba(0, 0, 0, 0.47)',
			':active': {
				backgroundColor: '#313136',
			},
			':hover': {
				backgroundColor: '#436941',
			},
			// borderRadius: 2,
		};
	},
	dropdownIndicator: (provided, state) => ({
		// content: 's',
		color: state.isFocused ? '#8F8F92' : '#8F8F92',
		marginRight: 5,
		marginTop: state.isFocused ? 0 : 3,
		transform: `rotateX(${state.isFocused ? 180 : 0}deg)`,
	}),
	indicatorSeparator: () => ({}),
	menu: (provided) => ({
		...provided,
		width: 250,
		borderRadius: 10,
		'::-webkit-scrollbar': {
			display: 'none',
		},
	}),
	menuList: (provided) => ({
		...provided,
		backgroundColor: '#313136',
		'::-webkit-scrollbar': {
			display: 'none',
		},
	}),
	control: (provided) => ({
		...provided,
		width: 250,
		backgroundColor: '#25252A',
		border: 'none',
		borderRadius: 5,
		color: 'white',
		boxShadow: '3px 3px 8px -1px rgba(0, 0, 0, 0.4)',
		':hover': {
			cursor: 'pointer',
		},
	}),
	singleValue: (provided, state) => {
		const opacity = state.isDisabled ? 0.5 : 1;
		const transition = 'opacity 300ms';

		return { ...provided, opacity, transition };
	},
};

const appData = window.api.getAppData();

export class ChangeInstallationView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedOption: options[0],
			selectedVerOption: verOptions[0],
			uuid: uuidv4(),
			name: '',
			image: 'default',
			root: '',
			version: { number: '1.18.1', type: 'release' },
			ram: 2048,
			javaPath: '',
			ramSlider: (
				<Slider
					min={1024}
					max={2048}
					step={null}
					defaultValue={2048}
					dots={true}
					marks={getMarks(2048)}
					dotStyle={{
						borderColor: '#707070',
						backgroundColor: '#707070',
						height: 15,
						width: 15,
						top: -3,
					}}
					activeDotStyle={{
						borderColor: '#57C262',
						backgroundColor: '#57C262',
						height: 15,
						width: 15,
						top: -3,
						transitionDuration: '0.3s',
					}}
					railStyle={{
						backgroundColor: '#707070',
						height: 9,
					}}
					trackStyle={{
						height: 9,
						backgroundColor: '#57C262',
						transitionDuration: '0.2s',
					}}
					handleStyle={{
						height: 20,
						width: 20,
						border: 'none',
						backgroundColor: '#38A544',
						marginLeft: 3,
						transitionDuration: '0.2s',
						':focus': {
							height: 24,
							width: 24,
						},
					}}
					onChange={(value) => {
						this.setState({ ram: value });
					}}
				/>
			),
		};
		// s = this.props.location.state;
	}

	async componentDidMount() {
		let s = await this.props.location.state.ins;
		let maxMem = parseInt((await window.api.getMaxMemory()) / (1024 * 1024));
		this.setState({
			selectedOption: options[getSelectedImage(s.image)],
			selectedVerOption: verOptions[getSelectedVerOption(s.version)],
			uuid: s.uuid,
			name: s.name,
			image: s.image,
			root: s.root,
			version: s.version,
			ram: parseInt(s.ram.max.slice(0, -1)) * 1024,
			javaPath: s.javaPath,
			ramSlider: (
				<Slider
					key={uuidv4()}
					min={1024}
					max={maxMem}
					step={null}
					defaultValue={parseInt(s.ram.max.slice(0, -1)) * 1024}
					dots={true}
					marks={getMarks(maxMem)}
					dotStyle={{
						borderColor: '#707070',
						backgroundColor: '#707070',
						height: 15,
						width: 15,
						top: -3,
					}}
					activeDotStyle={{
						borderColor: '#57C262',
						backgroundColor: '#57C262',
						height: 15,
						width: 15,
						top: -3,
						transitionDuration: '0.3s',
					}}
					railStyle={{
						backgroundColor: '#707070',
						height: 9,
					}}
					trackStyle={{
						height: 9,
						backgroundColor: '#57C262',
						transitionDuration: '0.2s',
					}}
					handleStyle={{
						height: 20,
						width: 20,
						border: 'none',
						backgroundColor: '#38A544',
						marginLeft: 3,
						transitionDuration: '0.2s',
						':focus': {
							height: 24,
							width: 24,
						},
					}}
					onChange={(value) => {
						this.setState({ ram: value });
					}}
				/>
			),
		});
	}

	handleChange = (selectedOption) => {
		this.setState({ selectedOption });
		this.setState({ image: selectedOption.value });
	};
	handleChangeVer = (selectedVerOption) => {
		this.setState({ selectedVerOption });
		this.setState({ version: selectedVerOption.value });
	};

	saveInstallation = async () => {
		let ins = {
			uuid: this.state.uuid,
			name: this.state.name !== '' ? this.state.name : 'New Installation',
			image: this.state.image,
			root: this.state.root !== '' ? this.state.root : appData,
			version: this.state.version,
			ram: {
				min: '1G',
				max: Math.trunc(this.state.ram / 1024) + 'G',
			},
			javaPath: this.state.javaPath !== '' ? this.state.javaPath : 'java',
			lastUsed: parseInt(Date.now() / 1000),
		};

		await window.api.instances.saveInstance(ins);

		setTimeout(() => {
			this.props.history.push('/installations');
		}, 100);
	};

	render() {
		const self = this;
		const { selectedOption } = this.state;
		// selectedVerOption = this.state.selectedVerOption;
		const maxMem = 1024 * 32;
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

				<div className='inOptView'>
					<div className='inOptName'>
						<div className='installationNameText inOptText'>Name</div>
						<input
							value={this.state.name}
							type='text'
							name='installationNameIn'
							id='installationNameIn'
							className='installationNameIn'
							placeholder='Installation Name...'
							maxLength={25}
							onChange={(e) => {
								self.setState({ name: e.target.value });
							}}
						/>
					</div>
					<div className='inOptImage'>
						<div className='installationImageText inOptText'>Image</div>

						<Select styles={customStyles} value={selectedOption} onChange={this.handleChange} options={options} />
					</div>
					<div className='inOptDir'>
						<div className='installationDirText inOptText'>Game Directory</div>
						<input
							value={this.state.root}
							type='text'
							name='installationDirIn'
							id='installationDirIn'
							className='installationDirIn'
							placeholder='< Use Default Directory >'
							onChange={(e) => {
								self.setState({ root: e.target.value });
							}}
						/>
					</div>
					<div className='inOptVersion'>
						<div className='installationVersionText inOptText'>Version</div>

						<Select
							styles={customStyles}
							value={this.state.selectedVerOption}
							onChange={this.handleChangeVer}
							options={verOptions}
						/>
					</div>
					<div className='inOptJava'>
						<div className='installationJavaText inOptText'>Java Executable</div>
						<input
							type='text'
							value={this.state.javaPath}
							name='installationJavaIn'
							id='installationJavaIn'
							className='installationJavaIn'
							placeholder='< Use Bundled Java Runtime >'
							onChange={(e) => {
								self.setState({ javaPath: e.target.value });
							}}
						/>
					</div>
					<div className='inOptArgs'>
						<div className='installationArgsText inOptText'>JVM Arguments</div>
						<input
							type='text'
							name='installationArgsIn'
							id='installationArgsIn'
							className='installationArgsIn'
							placeholder='< Use Default Arguments >'
							disabled={true}
						/>
					</div>
					<div className='inOptRam'>
						<div className='installationMemText inOptText'>Allocated Memory</div>
						{this.state.ramSlider}
					</div>
					<div className='inOptButtons'>
						<Link to='/installations'>
							<button className='inOptCancel inOptButton'>Cancel</button>
						</Link>
						<button className='inOptSave inOptButton' onClick={this.saveInstallation}>
							Save
						</button>
					</div>
				</div>
			</div>
		);
	}
}

function getMarks(maxMem) {
	let markStyle = {
		marginTop: 5,
		color: '#838388',
	};

	let marks = { 1024: { style: markStyle, label: '1G' } };

	if (maxMem >= 2048 && maxMem < 49152) marks[2048] = { style: markStyle, label: '2G' };
	if (maxMem >= 3072 && maxMem < 49152) marks[3072] = { style: markStyle, label: '3G' };
	if (maxMem >= 4096) marks[4096] = { style: markStyle, label: '4G' };
	if (maxMem >= 6144 && maxMem < 49152) marks[6144] = { style: markStyle, label: '6G' };
	if (maxMem >= 8192) marks[8192] = { style: markStyle, label: '8G' };
	if (maxMem >= 12288) marks[12288] = { style: markStyle, label: '12G' };
	if (maxMem >= 16384) marks[16384] = { style: markStyle, label: '16G' };
	if (maxMem >= 20480) marks[20480] = { style: markStyle, label: '20G' };
	if (maxMem >= 24576) marks[24576] = { style: markStyle, label: '24G' };
	if (maxMem >= 28672) marks[28672] = { style: markStyle, label: '28G' };
	if (maxMem >= 32768) marks[32768] = { style: markStyle, label: '32G' };
	if (maxMem >= 40960) marks[40960] = { style: markStyle, label: '40G' };
	if (maxMem >= 49152) marks[49152] = { style: markStyle, label: '48G' };
	if (maxMem >= 57344) marks[57344] = { style: markStyle, label: '56G' };
	if (maxMem >= 65536) marks[65536] = { style: markStyle, label: '64G' };
	if (maxMem >= 81920) marks[81920] = { style: markStyle, label: '80G' };
	if (maxMem >= 98304) marks[98304] = { style: markStyle, label: '96G' };
	if (maxMem >= 114688) marks[114688] = { style: markStyle, label: '112G' };
	if (maxMem >= 131072) marks[131072] = { style: markStyle, label: '128G' };

	marks[maxMem] = { style: markStyle, label: Math.trunc(maxMem / 1024) + 'G' };

	return marks;
}

function getSelectedImage(img) {
	for (let i = 0; i < options.length; i++) {
		if (options[i].value === img) return i;
	}
	return 0;
}

function getSelectedVerOption(ver) {
	for (let i = 0; i < verOptions.length; i++) {
		if (verOptions[i].value.number === ver.number) return i;
	}
	return 0;
}

function minWindow() {
	window.api.appFunctions.minimize();
}

function closeWindow() {
	window.api.appFunctions.close();
}

export default ChangeInstallationView;
