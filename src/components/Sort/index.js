import React from 'react';
import { Grid } from '@material-ui/core';
import { useTranslation } from "react-i18next";

import { Dropdown } from 'Components/Inputs';
import './Sort.scss';
import SortToggler from 'Components/SortToggler';

export default function Sort({ onSelect, options, onToggleSort }) {
  const { i18n } = useTranslation();

  return (
    <div className="sort">
      <Grid container direction="row" spacing={1} alignItems="center">
        <Grid item xs={2} md={3}>
          <div className="sort__heading">{i18n.t('sortText')}</div>
        </Grid>
        <Grid item xs={8} md={8}>
          <Dropdown onSelect={onSelect} options={options} />
        </Grid>
        <Grid item xs={2} md={1}>
          <SortToggler onToggleSort={onToggleSort} />
        </Grid>
      </Grid>
    </div>
  );
}
