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
      <Grid container direction="row" spacing={2} justify="center">
        <Grid item xs={2}>
          <Grid container justify="flex-start">
            <Button onClick={onFirst} className="pagination-controller__button" variant="contained" >First</Button>
          </Grid>
        </Grid>
        <Grid item xs={2}>
          <Grid container justify="center">
            <Button onClick={onPrevious} variant="contained" ><KeyboardArrowLeft fontSize="large" /></Button>
          </Grid>
        </Grid>
        <Grid item xs={2}>
          <Grid container justify="center">
            <div className="pagination-controller__range">
              <h3 className="pagination-controller__page-number">{resultsShown} of {totalResults}</h3>
            </div>
          </Grid>
        </Grid>
        <Grid item xs={2}>
          <Grid container justify="center">
            <Button onClick={onNext} variant="contained" ><KeyboardArrowRight fontSize="large" /></Button>
          </Grid>
        </Grid>
        <Grid item xs={2}>
          <Grid container justify="center">
            <Button onClick={onLast} variant="contained" >Last</Button>
          </Grid>
        </Grid>
        <Grid item xs={2}>
          <Grid container justify="flex-end">
            <Button onClick={onShowList} variant="contained" ><List fontSize="large" /></Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}
