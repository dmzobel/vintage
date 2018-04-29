import React, { Component } from 'react';
import { Home, Navbar } from './components';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Switch, Route, Redirect } from 'react-router-dom';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <MuiThemeProvider>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Redirect to="/" />
          </Switch>
        </MuiThemeProvider>
      </div>
    );
  }
}
