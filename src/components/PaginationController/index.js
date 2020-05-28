import React from 'react'
import { Grid, Button } from '@material-ui/core';
import { useTranslation } from "react-i18next";
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
  const { i18n } = useTranslation();
  return (
    <div className="pagination-controller">
      <Grid container direction="row" spacing={1} justify="center">
        <Grid item xs={2}>
          <Grid container justify="flex-start">
            <Button onClick={onFirst} className="pagination-controller__button" variant="contained" >{i18n.t('navFirst')}</Button>
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
              <h3 className="pagination-controller__page-number">{resultsShown} {i18n.t('of')} {totalResults}</h3>
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
            <Button onClick={onLast} variant="contained" >{i18n.t('navLast')}</Button>
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
