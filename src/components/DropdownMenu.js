import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

export default function DropdownMenu(props) {
  return (
    <DropDownMenu
      maxHeight={200}
      value={props.value}
      onChange={props.handleChange}
      className="dropdown"
      autoWidth={false}
    >
      {props.items.map(item => (
        <MenuItem value={item} key={item} primaryText={item} />
      ))}
    </DropDownMenu>
  );
}
