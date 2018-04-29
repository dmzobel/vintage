import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from 'material-ui/Avatar';
import {
  blue300,
  indigo900,
  orange200,
  deepOrange300,
  pink400,
  purple500
} from 'material-ui/styles/colors';

const style = { margin: 5 };

const Logo = () => (
  <Link to="/">
    <Avatar backgroundColor={purple500} size={30} style={style}>
      V
    </Avatar>
  </Link>
);

export default Logo;
