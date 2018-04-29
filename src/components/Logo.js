import React from 'react';
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
  <Avatar backgroundColor={purple500} size={30} style={style}>
    V
  </Avatar>
);

export default Logo;
