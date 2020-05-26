import React from 'react';
import { Grid, Button } from '@material-ui/core';
import { Dropdown } from 'Components/Inputs';

import './Filters.scss';

export default function Filters({ onSeeMore }) {
  return (
    <div className="filters">
      <Grid container direction="row" spacing={2}>
        <Grid item xs={1}>
          <div className="filters__heading">FILTERS</div>
        </Grid>
        <Grid item xs>
          <Grid container direction="row" spacing={2} alignItems="center">
            <Grid item xs={3}>
              <Dropdown onSelect={() => { }} options={[]} />
            </Grid>
            <Grid item xs={3}>
              <Dropdown onSelect={() => { }} options={[]} />
            </Grid>
            <Grid item xs={3}>
              <Dropdown onSelect={() => { }} options={[]} />
            </Grid>
            <Grid item xs={3}>
              <Dropdown onSelect={() => { }} options={[]} />
            </Grid>
            <Grid item xs={3}>
              <Dropdown onSelect={() => { }} options={[]} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={2}>
          <Button onClick={() => onSeeMore()}>more</Button>
        </Grid>
      </Grid>
    </div>
  )
}
