const { contextBridge, clipboard, ipcRenderer } = require("electron");
const remote = require("@electron/remote");
const keytar = require("keytar");
const os = require("os");
const { Client } = require("minecraft-launcher-core");
const launcher = new Client();
const msmc = require("./Core/msmc/index");
const dashUUID = require("add-dashes-to-uuid");
const settings = require("electron-json-storage");

const launcherVersion = "0.0.2-beta";

const appData =
  (process.env.APPDATA ||
    (process.platform == "darwin"
      ? process.env.HOME + "/L)ibrary/Preferences"
      : process.env.HOME + "/.local/share")) + "\\TeakMCLauncher";

const addAccount = async (uuid, data) => {
  settings.setDataPath(appData);

  let config = settings.getSync("settings.json");
  if (config == undefined) config = {};

  if (config.accounts == undefined) {
    config.accounts = {};
  }

  if (!config.accounts[uuid])
    config.accounts[uuid] = {
      lastUsed: parseInt(Date.now() / 1000),
      uuid: uuid,
    };

  settings.set(
    `settings.json`,
    config,
    { prettyPrinting: true },
    function (error) {
      if (error) throw error;
    }
  );

  keytar.setPassword("accounts", uuid, JSON.stringify(data));

  ipcRenderer.send("accountChangez", "add");
};

let getDefaultAccount = () => {
  settings.setDataPath(appData);

  let config = settings.getSync("settings.json");

  return config.defaultAccount;
};

let getActiveAccount = () => {
  settings.setDataPath(appData);

  let config = settings.getSync("settings.json");

  return config.activeAccount;
};

let getInstallation = (id) => {
  settings.setDataPath(appData);

  let config = settings.getSync("settings.json");

  return config.installations[id];
};

let win = null;

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld("api", {
  version: {
    getOSVersion() {
      return `${require("os").type()} - ${require("os").release()}`;
    },
    getLauncherVersion() {
      return launcherVersion;
    },
  },
  instances: {
    setActiveInstance(id) {
      settings.setDataPath(appData);

      let config = settings.getSync("settings.json");

      config.activeInstallation = id;

      settings.set(
        `settings.json`,
        config,
        { prettyPrinting: true },
        function (error) {
          if (error) throw error;
        }
      );
    },
    getActiveInstance() {
      settings.setDataPath(appData);

      let config = settings.getSync("settings.json");

      return config.activeInstallation || undefined;
    },
    async playInstance(id) {
      ipcRenderer.send("launchingPercentz", {
        status: "launching",
        percent: 0,
      });
      let ins = getInstallation(id);

      let uuid = await getActiveAccount();

      settings.setDataPath(appData);

      let config = settings.getSync("settings.json");

      config.accounts[uuid].lastUsed = parseInt(Date.now() / 1000);

      settings.set(
        `settings.json`,
        config,
        { prettyPrinting: true },
        function (error) {
          if (error) throw error;
        }
      );

      let data = {
        name: ins.name,
        root: ins.root,
        version: {
          number: ins.version.number,
          type: ins.version.type,
        },
        memory: {
          min: ins.ram.min,
          max: ins.ram.max,
        },
        javaPath: ins.javaPath,
      };
      let account = JSON.parse(await keytar.getPassword("accounts", uuid));

      // if (!msmc.validate(account.profile)) {
      await msmc
        .refresh(account.profile, (info) => {
          let data = {
            status: "launching",
            percent: 10,
          };

          ipcRenderer.send("launchingPercentz", data);
        })
        .then(async (result) => {
          account = result;

          let options = {
            clientPackage: null,
            authorization: msmc.getMCLC().getAuth(await account),
            root: data.root,
            version: data.version,
            memory: data.memory,
            javaPath: data.javaPath,
            overrides: {
              detached: false,
            },
          };

          console.log(`Starting ${data.name}`);
          launcher.launch(options);

          // launcher.on('data', (e) => console.log(e));
          launcher.on("debug", (e) => {
            console.log(e);
            if (e.startsWith("[MCLC]: Using Java")) {
              ipcRenderer.send("launchingPercentz", {
                status: "launching",
                percent: 20,
              });
            }
            if (e.startsWith("[MCLC]: Set native")) {
              ipcRenderer.send("launchingPercentz", {
                status: "launching",
                percent: 30,
              });
            }
            if (e.startsWith("[MCLC]: Collected")) {
              ipcRenderer.send("launchingPercentz", {
                status: "launching",
                percent: 35,
              });
            }
            if (e.startsWith("[MCLC]: Using ;")) {
              ipcRenderer.send("launchingPercentz", {
                status: "launching",
                percent: 45,
              });
            }
            if (e.startsWith("[MCLC]: Attempting")) {
              ipcRenderer.send("launchingPercentz", {
                status: "launching",
                percent: 50,
              });
            }
            if (e.startsWith("[MCLC]: Downloaded")) {
              ipcRenderer.send("launchingPercentz", {
                status: "launching",
                percent: 70,
              });
            }
            if (e.startsWith("[MCLC]: Set launch")) {
              ipcRenderer.send("launchingPercentz", {
                status: "launching",
                percent: 75,
              });
            }
            if (e.startsWith("[MCLC]: Launching")) {
              ipcRenderer.send("launchingPercentz", {
                status: "launching",
                percent: 100,
              });
              setTimeout(() => {
                ipcRenderer.send("launchingPercentz", {
                  status: "launching",
                  percent: 100,
                });
                setTimeout(() => {
                  ipcRenderer.send("launchingPercentz", { status: "done" });
                }, 1000);
              }, 500);
            }
          });
        });
      // }
    },
    createInstance(id, name, location, version, maxRam, javaPath = "java") {
      settings.setDataPath(appData);

      let config = settings.getSync("settings.json");

      config.installations[id] = {
        uuid: id,
        name: name,
        root: location,
        version: version,
        ram: {
          min: "1G",
          max: maxRam,
        },
        javaPath: javaPath,
      };

      settings.set(
        `settings.json`,
        config,
        { prettyPrinting: true },
        function (error) {
          if (error) throw error;
        }
      );
    },
    saveInstance(installation) {
      settings.setDataPath(appData);

      let config = settings.getSync("settings.json");

      config.installations[installation.uuid] = installation;

      settings.set(
        `settings.json`,
        config,
        { prettyPrinting: true },
        function (error) {
          if (error) throw error;
        }
      );
    },
    getInstance(id) {
      settings.setDataPath(appData);

      let config = settings.getSync("settings.json");

      return config.installations[id];
    },
    findInstances() {
      settings.setDataPath(appData);

      let config = settings.getSync("settings.json");

      let instances = [];

      for (const uuid in config.installations) {
        instances.push(config.installations[uuid]);
      }

      return instances;
    },
    deleteInstance(id) {
      console.log("Deleting " + id);
      settings.setDataPath(appData);

      let config = settings.getSync("settings.json");

      delete config.installations[id];

      settings.set(
        `settings.json`,
        config,
        { prettyPrinting: true },
        function (error) {
          if (error) throw error;
        }
      );
    },
  },
  accounts: {
    getActiveAccount,
    setActiveAccount(account) {
      settings.setDataPath(appData);

      let config = settings.getSync("settings.json");

      config.activeAccount = account;

      settings.set(
        `settings.json`,
        config,
        { prettyPrinting: true },
        function (error) {
          if (error) throw error;
        }
      );
      ipcRenderer.send("changeActiveAccountz", "change");
    },
    getDefaultAccount,
    setDefaultAccount(account, active = false) {
      settings.setDataPath(appData);

      let config = settings.getSync("settings.json");

      config.defaultAccount = account;

      if (active) {
        config.activeAccount = account;
      }

      settings.set(
        `settings.json`,
        config,
        { prettyPrinting: true },
        function (error) {
          if (error) throw error;
        }
      );
      ipcRenderer.send("changeActiveAccountz", "change");
    },
    addAccount,
    async isDemoUser(uuid) {
      return msmc.isDemoUser(
        JSON.parse(await keytar.getPassword("accounts", uuid))
      );
    },
    async getAccount(uuid) {
      return JSON.parse(await keytar.getPassword("accounts", uuid));
    },
    async findAccounts() {
      settings.setDataPath(appData);

      let config = settings.getSync("settings.json");
      let activeAccount = await getActiveAccount();
      let defaultAccount = await getDefaultAccount();

      let accounts = [];

      for (const uuid in config.accounts) {
        accounts.push({
          uuid: uuid,
          username: JSON.parse(await keytar.getPassword("accounts", uuid))
            .profile.name,
          lastUsed: config.accounts[uuid].lastUsed,
          data: JSON.parse(await keytar.getPassword("accounts", uuid)),
          isDefault: defaultAccount == uuid,
          isActive: activeAccount == uuid,
        });
      }

      return accounts;
    },
    async removeAccount(uuid) {
      settings.setDataPath(appData);

      let config = settings.getSync("settings.json");

      delete config.accounts[uuid];

      settings.set(
        `settings.json`,
        config,
        { prettyPrinting: true },
        function (error) {
          if (error) throw error;
        }
      );

      await keytar.deletePassword("accounts", uuid);
      ipcRenderer.send("accountChangez", "add");
    },
    async clearAccounts() {
      (await keytar.findCredentials("accounts")).forEach((account) => {
        keytar.deletePassword("accounts", account.account);
      });
      ipcRenderer.send("accountChangez", "add");
    },
    login() {
      msmc
        .fastLaunch("electron", (update) => {
          //A hook for catching loading bar events and errors, standard with MSMC
          console.log(update);
        })
        .then((result) => {
          //Let's check if we logged in?
          if (msmc.errorCheck(result)) {
            console.log(result.reason);
            return;
          }

          let acId = result.profile.id.includes("-")
            ? result.profile.id
            : dashUUID(result.profile.id);

          console.log(`Adding Account: ${acId}`);

          addAccount(acId, result);
        })
        .catch((reason) => {
          //If the login fails
          console.log("We failed to log someone in because : " + reason);
        });
    },
  },
  openInBrowser(url) {
    require("electron").shell.openExternal(url);
  },
  copyText(text) {
    clipboard.writeText(text);
  },
  async launch() {
    let uuid = await getActiveAccount();

    settings.setDataPath(appData);

    let config = settings.getSync("settings.json");

    config.accounts[uuid].lastUsed = parseInt(Date.now() / 1000);

    settings.set(
      `settings.json`,
      config,
      { prettyPrinting: true },
      function (error) {
        if (error) throw error;
      }
    );

    let data = {
      name: "Release 1.18.1",
      root: "C:/Users/TeakIvy/AppData/Roaming/.minecraft",
      version: {
        number: "1.18.1",
        type: "release",
      },
      memory: {
        min: "1G",
        max: "4G",
      },
      javaPath: "java",
    };
    let account = JSON.parse(await keytar.getPassword("accounts", uuid));

    // if (!msmc.validate(account.profile)) {
    msmc
      .refresh(account.profile, (info) => {
        console.log(info);
      })
      .then(async (result) => {
        account = result;
        let options = {
          clientPackage: null,
          authorization: msmc.getMCLC().getAuth(await account),
          root: data.root,
          version: data.version,
          memory: data.memory,
          javaPath: data.javaPath,
          overrides: {
            detached: false,
          },
        };

        console.log(`Starting ${data.name}`);
        launcher.launch(options);

        // launcher.on('debug', (e) => console.log(e));
        // launcher.on('data', (e) => console.log(e));
      });
    // }
  },
  appFunctions: {
    minimize() {
      remote.BrowserWindow.getFocusedWindow().minimize();
    },
    close() {
      remote.BrowserWindow.getFocusedWindow().close();
    },
  },
  config: {
    generate() {
      settings.setDataPath(appData);

      let config = settings.getSync("settings.json");

      if (!config.accounts) config.accounts = {};
      if (!config.activeAccount) config.activeAccount = "";
      if (!config.defaultAccount) config.defaultAccount = "";
      if (!config.installations) config.installations = {};
      if (!config.activeInstallation) config.activeInstallation = "";
      if (!config.config) {
        config.config = {
          resetToDefaultAccount: true,
          keepLauncherOpen: true,
          shiftPromptSignIn: false,
          openLogOnStart: false,
        };
      }

      settings.set(
        `settings.json`,
        config,
        { prettyPrinting: true },
        function (error) {
          if (error) throw error;
        }
      );
    },
    set(option, value) {
      settings.setDataPath(appData);

      let config = settings.getSync("settings.json");

      if (!config.config) {
        config.config = {
          [option]: false,
        };
      }
      config.config[option] = value;

      settings.set(
        `settings.json`,
        config,
        { prettyPrinting: true },
        function (error) {
          if (error) throw error;
        }
      );
    },
    get(option) {
      settings.setDataPath(appData);

      let config = settings.getSync("settings.json");

      if (!config.config) {
        console.log("no config");
        config.config = {
          [option]: false,
        };
      }
      return config.config[option];
    },
  },
  send: (channel, data) => {
    // whitelist channels
    // let validChannels = ['toMain'];
    // if (validChannels.includes(channel)) {
    ipcRenderer.send(channel, data);
    // }
  },
  receive: (channel, func) => {
    // let validChannels = ['fromMain'];
    // if (validChannels.includes(channel)) {
    // Deliberately strip event as it includes `sender`
    ipcRenderer.on(channel, (event, ...args) => {
      func(...args);
    });
    // }
  },
  getAppData: () => {
    return (
      (process.env.APPDATA ||
        (process.platform == "darwin"
          ? process.env.HOME + "/L)ibrary/Preferences"
          : process.env.HOME + "/.local/share")) + "\\.minecraft"
    );
  },
  getMaxMemory: () => {
    return os.totalmem() + 4096;
  },
});
