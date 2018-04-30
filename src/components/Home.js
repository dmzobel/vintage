import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';

export default class Home extends Component {
  render() {
    return (
      <div className="welcome center">
        <p className="title relative white-text fun-font">Welcome to Vintage</p>
        <p className="subtitle relative white-text">
          Using climate data to predict red wine quality
        </p>
        <Link to="/rankings">
          <RaisedButton label="See the list" />
        </Link>
      </div>
    );
  }
}
