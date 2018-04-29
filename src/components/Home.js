import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import VintageList from './VintageList';
import RaisedButton from 'material-ui/RaisedButton';

export default class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <h1 className="relative">Welcome to Vintage</h1>
        <Link to="/rankings">
          <RaisedButton label="See the list" />
        </Link>
      </React.Fragment>
    );
  }
}
