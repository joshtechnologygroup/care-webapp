import React from 'react'
import { Grid, FormControl, Select, MenuItem } from '@material-ui/core'
import './Sort.scss';

export default function Sort(
  {
    onSelect
  }
) {
  return (
    <div className="sort">
      <Grid container direction="row" spacing={2} alignItems="center">
        <Grid item xs={4}>
          <div className="sort__heading">SORT</div>
        </Grid>
        <Grid item xs={8}>
          <FormControl>
            <Select
              value={10}
              onChange={null}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </div>
  );
}
