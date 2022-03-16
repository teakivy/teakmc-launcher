import "./App.css";
import SideBar from "./components/SideBar/SideBar";
import React from "react";
import PlayView from "./views/PlayView.jsx/PlayView";
import InstallationsView from "./views/InstallationsView/InstallationsView";
import SettingsView from "./views/SettingsView/SettingsView";
import SettingsAboutView from "./views/SettingsViewAbout/SettingsAboutView";
import SettingsAccountsView from "./views/SettingsViewAccounts/SettingsAccountsView";
import { HashRouter, Switch, Route } from "react-router-dom";
import ChangeInstallationView from "./views/ChangeInstallationView/ChangeInstallationView";
// const { ipc } = window.require('electron');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: [],
    };
  }

  componentDidMount() {
    window.api.send("update-notify-value", "test");

    window.api.receive("targetPriceVal", function (arg) {
      // console.log('arg' + arg);
    });
  }

  render() {
    return (
      <HashRouter>
        <SideBar />
        <Switch>
          <Route exact path="/" component={PlayView} />
          <Route exact path="/installations" component={InstallationsView} />
          <Route
            exact
            path="/installations/add"
            component={ChangeInstallationView}
          />
          <Route exact path="/settings" component={SettingsView} />
          <Route exact path="/settings/about" component={SettingsAboutView} />
          <Route
            exact
            path="/settings/accounts"
            component={SettingsAccountsView}
          />
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
