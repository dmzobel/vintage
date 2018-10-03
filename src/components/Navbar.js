import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import './Navbar.style.css';

import Logo from './Logo';

const RightMenu = () => (
  <div>
    <Link to="/rankings">
      <FlatButton label="Rankings" className="white-text" />
    </Link>
    <Link to="/search">
      <FlatButton label="Search" className="white-text" />
    </Link>
    <Link to="/map">
      <FlatButton label="Map" className="white-text" />
    </Link>
    <Link to="/login">
      <FlatButton label="Login" className="white-text" />
    </Link>
  </div>
);

const Navbar = () => (
  <AppBar
    iconElementLeft={<Logo />}
    iconElementRight={<RightMenu />}
    className="navbar"
  />
);

export default Navbar;
