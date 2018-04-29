import React from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

import Logo from './Logo';

const RightMenu = () => (
  <div>
    <FlatButton label="Rankings" className="white-text" />
    <FlatButton label="Map" className="white-text" />
    <FlatButton label="Contact Us" className="white-text" />
  </div>
);

const Navbar = () => (
  <div>
    <AppBar
      title="Vintage"
      iconElementLeft={<Logo />}
      iconElementRight={<RightMenu />}
    />
  </div>
);

export default Navbar;
