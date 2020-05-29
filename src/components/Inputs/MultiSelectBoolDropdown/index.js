import React from 'react'
import { FormControl, Select, Input, MenuItem, Checkbox, ListItemText } from '@material-ui/core'

export default function MultiSelectBoolDropdown({ fieldName, options, onSelect, paramName }) {
  const [value, setValue] = React.useState([]);
  const handleChange = (event) => {
    setValue(event.target.value);
    let value_return = {}
    value_return[paramName] = event.target.value
    onSelect(value_return);
  };
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  return (
    <div className="input-common">
      <FormControl>
        <Select
          multiple
          displayEmpty
          value={value}
          onChange={handleChange}
          input={<Input />}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>{fieldName}</em>;
            }

            return fieldName + ': ' + selected.join(', ');
          }}
          MenuProps={MenuProps}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem disabled value="">
            <em>{fieldName}</em>
          </MenuItem>
          {options.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox color="primary" checked={value.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}

