import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

import Logo from './Logo';

const RightMenu = () => (
  <div>
    <Link to="/rankings">
      <FlatButton label="Rankings" className="white-text" />
    </Link>
    <Link to="/map">
      <FlatButton label="Map" className="white-text" />
    </Link>
    <Link to="">
      <FlatButton label="Contact Us" className="white-text" />
    </Link>
  </div>
);

const Navbar = () => (
  <div>
    <AppBar
      title="Vintage"
      iconElementLeft={<Logo />}
      iconElementRight={<RightMenu />}
      className="navbar fun-font"
    />
  </div>
);

export default Navbar;
