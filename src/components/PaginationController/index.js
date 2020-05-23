import React from 'react'
import { Grid, Button } from '@material-ui/core';
import { KeyboardArrowLeft, KeyboardArrowRight, List } from '@material-ui/icons';

import './PaginationController.scss';

export default function PaginationController({
  resultsShown,
  totalResults,
  onFirst,
  onPrevious,
  onNext,
  onLast,
  onShowList,
  ...other
}) {
  return (
    <div className="pagination-controller">
      <Grid container direction="row" spacing={2} >
        <Grid item xs={2}>
          <Button onClick={onFirst} className="pagination-controller__button" variant="contained" >First</Button>
        </Grid>
        <Grid item xs={2}>
          <Button onClick={onPrevious} variant="contained" ><KeyboardArrowLeft fontSize="large" /></Button>
        </Grid>
        <Grid item xs={2}>
          <div className="pagination-controller__range">
            <h3>{resultsShown} of {totalResults}</h3>
          </div>
        </Grid>
        <Grid item xs={2}>
          <Button onClick={onNext} variant="contained" ><KeyboardArrowRight fontSize="large" /></Button>
        </Grid>
        <Grid item xs={2}>
          <Button onClick={onLast} variant="contained" >Last</Button>
        </Grid>
        <Grid item xs={2}>
          <Button onClick={onShowList} variant="contained" ><List fontSize="large" /></Button>
        </Grid>
      </Grid>
    </div>
  )
}
