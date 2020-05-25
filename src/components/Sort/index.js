import React from 'react';
import { Grid } from '@material-ui/core';

import { Dropdown } from 'Components/Inputs';
import './Sort.scss';
import SortToggler from 'Components/SortToggler';

export default function Sort({ onSelect, options, onToggleSort  }) {

  return (
    <div className="sort">
      <Grid container direction="row" spacing={1} alignItems="center">
        <Grid item xs={2}>
          <div className="sort__heading">SORT</div>
        </Grid>
        <Grid item xs={8}>
          <Dropdown onSelect={onSelect} options={options} />
        </Grid>
        <Grid item xs={2}>
          <SortToggler onToggleSort={onToggleSort} />
        </Grid>
      </Grid>
    </div>
  );
}
