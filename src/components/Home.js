import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';

export default class Home extends Component {
  render() {
    return (
      <div className="welcome">
        <p className="title relative white-text">Welcome to Vintage</p>
        <p className="subtitle relative white-text">
          The world's first objective measure of red wine quality
        </p>
        <Link to="/rankings">
          <RaisedButton label="See the list" />
        </Link>
      </div>
    );
  }
}
