import React, {useState} from 'react';
import { FormControl, FilledInput, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import '../Inputs.scss';

export default function Search({ searchPlaceholder, handleSearch }) {
  console.log(searchPlaceholder)
  const [value, setValue] = useState("");
  
  const handleChange = event => {
    const { value } = event.target;
    console.log(event.target.value)
    setValue(value);
    handleSearch(value);
 };

  return (
    <div className="input-common">
      <FormControl fullWidth variant="filled">
        <FilledInput
          id="filled-adornment-amount"
          onChange={handleChange}
          value={value}
          disableUnderline={true}
          placeholder={searchPlaceholder}
          startAdornment={<InputAdornment position="start"><SearchIcon fontSize="large" />
          </InputAdornment>}
        />
      </FormControl>
    </div>
  )
}
