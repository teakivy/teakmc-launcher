const remoteMain = require('@electron/remote/main');
remoteMain.initialize();

const { app, BrowserWindow } = require('electron');

const isDev = require('electron-is-dev');

const path = require('path');
const ipc = require('electron').ipcMain;

const settings = require('electron-json-storage');
const appData =
	(process.env.APPDATA ||
		(process.platform == 'darwin' ? process.env.HOME + '/L)ibrary/Preferences' : process.env.HOME + '/.local/share')) +
	'\\TeakMCLauncher';

// require('@electron/remote/main').initialize();

function createWindow() {
	settings.setDataPath(appData);

	let config = settings.getSync('settings.json');

	if (!config.accounts) config.accounts = {};
	if (!config.activeAccount) config.activeAccount = '';
	if (!config.defaultAccount) config.defaultAccount = '';
	if (!config.installations) config.installations = {};
	if (!config.activeInstallation) config.activeInstallation = '';
	if (!config.config) {
		config.config = {
			resetToDefaultAccount: true,
			keepLauncherOpen: true,
			shiftPromptSignIn: false,
			openLogOnStart: false,
		};
	}

	settings.set(`settings.json`, config, { prettyPrinting: true }, function (error) {
		if (error) throw error;
	});
	// Create the browser window.
	const win = new BrowserWindow({
		resizable: false,
		width: 1440,
		height: 810,
		autoHideMenuBar: true,
		frame: false,
		webPreferences: {
			nodeIntegration: true, // is default value after Electron v5
			enableRemoteModule: true,
			devTools: true,
			preload: path.join(__dirname, 'preload.js'), // use a preload script
		},
	});

	win.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);

	win.on('maximize', () => {
		win.unmaximize();
	});

	ipc.on('accountChangez', function (event, arg) {
		// console.log(...arg);
		win.webContents.send('accountChange', arg);
	});
	ipc.on('changeActiveAccountz', function (event, arg) {
		// console.log(...arg);
		win.webContents.send('changeActiveAccount', arg);
	});
	ipc.on('launchingPercentz', function (event, arg) {
		// console.log(...arg);
		win.webContents.send('launchingPercent', arg);
	});

	remoteMain.enable(win.webContents);
}

app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
	// On OS X it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', function () {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
