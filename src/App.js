import React, { Component } from 'react';
import './App.style.css';
import { Home, Navbar, VintageList, Map } from './components';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Switch, Route, Redirect } from 'react-router-dom';

export default class App extends Component {
  render() {
    return (
      <div id="app">
        <MuiThemeProvider>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/rankings" component={VintageList} />
            <Route exact path="/map" component={Map} />
            <Redirect to="/" />
          </Switch>
        </MuiThemeProvider>
      </div>
    );
  }
}
