import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

export default function DropdownMenu(props) {
  return (
    <SelectField
      maxHeight={200}
      value={props.value}
      onChange={props.handleChange}
      className="dropdown"
      autoWidth={false}
      floatingLabelText={'Filter By ' + props.filter}
    >
      {props.items.map(item => (
        <MenuItem value={item} key={item} primaryText={item} />
      ))}
    </SelectField>
  );
}
