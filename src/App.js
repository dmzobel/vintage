import React, { Component } from 'react';
import { Home, Navbar } from './components';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Switch, Route, Redirect } from 'react-router-dom';
import VintageListContainer from './components/VintageList';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <MuiThemeProvider>
          <img src="wine-country.jpg" className="background-img" />
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/rankings" component={VintageListContainer} />
            <Redirect to="/" />
          </Switch>
        </MuiThemeProvider>
      </div>
    );
  }
}
