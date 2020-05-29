import React from 'react';
import { Grid, Button } from '@material-ui/core';
import { useTranslation } from "react-i18next";

import { MultiSelectBoolDropdown, MultiSelectNumberDropdown, MultiSelectDateDropdown } from 'Components/Inputs';

import './Filters.scss';

export default function Filters({ onSeeMore, options, handleBooleanCallBack, handleNumberCallBack }) {
  const { i18n } = useTranslation();
  let countFilter = 0;
  const [showMore, setShowMore] = React.useState(false);
  const filterOptions = [...options].sort(function (a, b) {
    let x = a.cellRendererParams ? a.cellRendererParams.filterPriority : false;
    let y = b.cellRendererParams ? b.cellRendererParams.filterPriority : false;
    return (x === y) ? 0 : x ? -1 : 1;
  });
  const handleSeeMore = () => {
    setShowMore(!showMore);
    onSeeMore();
  }

  return (
    <div className="filters">
      <Grid container direction="row" spacing={2} >
        <Grid item xs={2} sm={1} md={1} >
          <div className="filters__heading">{i18n.t('filterText')}</div>
        </Grid>
        <Grid item xs={8} md={9}>
          <Grid container direction="row" spacing={2} alignItems="center">
            {
              filterOptions.map((option) => {
                if (option.cellRendererParams) {
                  switch (option.cellRendererParams['filterType']) {
                    case 'boolean':
                      countFilter += 1;
                      return (<Grid key={option['field']} item xs={12} sm={3}>
                        <MultiSelectBoolDropdown
                          onSelect={(val) => handleBooleanCallBack(val)}
                          options={option.cellRendererParams.options || ['Yes','No']} // can pass dynamically yes,No True false
                          fieldName={option['headerName']}
                          paramName={option['field']}/>
                      </Grid>);
                    case 'number':
                      countFilter += 1;
                      return (<Grid key={option['field']} item xs={12} sm={3}>
                        <MultiSelectNumberDropdown
                          onSelect={(val) => handleNumberCallBack(val)}
                          fieldName={option['headerName']}
                          field={option['field']}
                        />
                      </Grid>);
                    case 'date':
                      countFilter += 1;
                      return (<Grid key={option['field']} item xs={12} sm={3}>
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
          {(countFilter > 1 && (countFilter > 4 || window.innerWidth < 600)) ? <Button color="primary" onClick={handleSeeMore}>{showMore ? i18n.t('lessText') : i18n.t('moreText')}</Button> : null}
        </Grid>
      </Grid>
    </div>
  )
}
