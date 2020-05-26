import React from 'react';
import { Grid, Button } from '@material-ui/core';
import { useTranslation } from "react-i18next";

import { MultiSelectBoolDropdown, MultiSelectNumberDropdown, MultiSelectDateDropdown } from 'Components/Inputs';

import './Filters.scss';

export default function Filters({ onSeeMore, options }) {
  const { i18n } = useTranslation();
  const [showMore, setShowMore] = React.useState(false);

  const handleSeeMore = () => {
    setShowMore(!showMore);
    onSeeMore();
  }
  return (
    <div className="filters">
      <Grid container direction="row" spacing={2}>
        <Grid item xs={2} md={1}>
          <div className="filters__heading">{i18n.t('filterText')}</div>
        </Grid>
        <Grid item xs={8} md={9}>
          <Grid container direction="row" spacing={2} alignItems="center">
            {
              options.map((option) => {
                if (option.cellRendererParams) {
                  switch (option.cellRendererParams['filterType']) {
                    case 'boolean':
                      return (<Grid key={option['field']} item xs={4} md={3}>
                        <MultiSelectBoolDropdown
                          onSelect={(val) => console.log(`Filter ${val}`)}
                          options={['Yes', 'No']} // can pass dynamically yes,No True false
                          fieldName={option['headerName']} />
                      </Grid>);
                    case 'number':
                      return (<Grid key={option['field']} item xs={4} md={3}>
                        <MultiSelectNumberDropdown
                          onSelect={(val) => console.log(`Filter ${val}`)}
                          fieldName={option['headerName']}
                        />
                      </Grid>);
                    case 'date':
                      return (<Grid key={option['field']} item xs={4} md={3}>
                        <MultiSelectDateDropdown
                          onSelect={(val) => console.log(`Filter ${val}`)}
                          fieldName={option['headerName']}
                        />
                      </Grid>);
                    default: return '';
                  }
                } else {
                  return null;
                }
              })}
          </Grid>
        </Grid>
        <Grid item xs={2} md={2}>
          <Button color="primary" onClick={handleSeeMore}>{showMore ? i18n.t('lessText') : i18n.t('moreText')}</Button>
        </Grid>
      </Grid>
    </div>
  )
}
