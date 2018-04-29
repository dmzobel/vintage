import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from 'material-ui/Avatar';
import { purple500 } from 'material-ui/styles/colors';

const style = { margin: 5 };

const Logo = () => (
  <Link to="/">
    <Avatar
      src="grapes.png"
      backgroundColor={purple500}
      size={35}
      style={style}
    />
  </Link>
);

export default Logo;
