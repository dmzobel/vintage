import React, { Component } from 'react';
import { Home } from './components';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Switch, Route, Redirect } from 'react-router-dom';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <MuiThemeProvider>
          <Switch>
            <Route exact path="/" component={Home} />
            <Redirect to="/" />
          </Switch>
        </MuiThemeProvider>
      </div>
    );
  }
}
