import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from 'material-ui/Avatar';
import { purple500 } from 'material-ui/styles/colors';

const style = { margin: 5 };

const Logo = () => (
  <div className="navbar">
    <Link to="/">
      <Avatar
        src="grapes.png"
        backgroundColor={purple500}
        size={35}
        style={style}
      />
    </Link>
    <Link to="/" className="fun-font white-text">
      <h2>Vintage</h2>
    </Link>
  </div>
);

export default Logo;
