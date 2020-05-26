import React from 'react';
import { FormControl, Select, MenuItem } from '@material-ui/core';
import '../Inputs.scss';

export default function Dropdown({ onSelect, options }) {
  const [value, setValue] = React.useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
    onSelect(event.target.value);
  };
  return (
    <div className="input-common">
      <FormControl fullWidth>
        <Select
          value={value}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {
            options.map((option) => option.cellRendererParams && option.cellRendererParams['isSortable'] === true ?
              <MenuItem key={option['field']} value={option['field']}>
                {option['headerName']}
              </MenuItem> :
              null
            )
          }
        </Select>
      </FormControl>
    </div>
  )
}
