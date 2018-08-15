import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';

export default class Home extends Component {
  render() {
    return (
      <div className="welcome">
        <p className="title white-text">Welcome to Vintage</p>
        <p className="subtitle white-text">
          Using climate data to predict wine quality
        </p>
        <Link to="/rankings">
          <RaisedButton label="See the list" />
        </Link>
      </div>
    );
  }
}
