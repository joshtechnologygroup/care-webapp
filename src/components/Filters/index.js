import React from 'react';
import {Grid, Button, TextField, IconButton, Tooltip} from '@material-ui/core';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import {useTranslation} from "react-i18next";

import {MultiSelectBoolDropdown, MultiSelectNumberDropdown, MultiSelectDateDropdown} from 'Components/Inputs';

import './Filters.scss';

export default function Filters({
                                  onSeeMore,
                                  options,
                                  handleBooleanCallBack,
                                  handleNumberCallBack,
                                  handleDateCallBack,
                                  handleStringCallBack,
                                  handleApplyFilter,
                                  handleReset,
                                  defaultSelected
                                }) {
  const {i18n} = useTranslation();
  let countFilter = 0;
  const [showMore, setShowMore] = React.useState(false);
  const [reset, setReset] = React.useState(false);
  const filterOptions = [...options].sort(function (a, b) {
    let x = a.cellRendererParams ? a.cellRendererParams.filterPriority : false;
    let y = b.cellRendererParams ? b.cellRendererParams.filterPriority : false;
    return (x === y) ? 0 : x ? -1 : 1;
  });
  const [textFieldVal, setTextFieldVal] = React.useState(new Array(filterOptions.length).fill(""));
  const handleSeeMore = () => {
    setShowMore(!showMore);
    onSeeMore();
  }

  return (
    <div className="filters">
      <Grid container direction="row" spacing={2}>
        <Grid item xs={2} sm={1} md={1}>
          <div className="filters__heading">{i18n.t('filterText')}</div>
        </Grid>
        <Grid item xs={8} md={9}>
          <Grid container direction="row" spacing={2} alignItems="center">
            {
              filterOptions.map((option, index) => {
                if (option.cellRendererParams) {
                  switch (option.cellRendererParams['filterType']) {
                    case 'boolean':
                      countFilter += 1;
                      return (<Grid key={option['field']} item xs={12} sm={3}>
                        <MultiSelectBoolDropdown
                          onSelect={(val) => {
                            setReset(false);
                            handleBooleanCallBack(val);
                          }}
                          options={option.cellRendererParams.options || ['Yes', 'No']} // can pass dynamically yes,No True false
                          fieldName={option['headerName']}
                          paramName={option['field']}
                          reset={reset}
                          defaultSelected={defaultSelected}
                        />
                      </Grid>);
                    case 'number':
                      countFilter += 1;
                      return (<Grid key={option['field']} item xs={12} sm={3}>
                        <MultiSelectNumberDropdown
                          onSelect={(val) => {
                            setReset(false);
                            handleNumberCallBack(val)
                          }
                          }
                          fieldName={option['headerName']}
                          field={option['field']}
                          reset={reset}
                        />
                      </Grid>);
                    case 'date':
                      countFilter += 1;
                      return (<Grid key={option['field']} item xs={12} sm={3}>
                        <MultiSelectDateDropdown
                          onSelect={(val) => {
                            setReset(false)
                            handleDateCallBack(val)
                          }}
                          fieldName={option['headerName']}
                          field={option['field']}
                          reset={reset}
                        />
                      </Grid>);
                    case 'string':
                      countFilter += 1;
                      return (<Grid key={option['field']} item xs={12} sm={3}>
                        <TextField
                          className="search-input"
                          label={`Search ${option['headerName']}`}
                          name={option['field']}
                          type="search"
                          variant="outlined"
                          size="small"
                          value={textFieldVal[index]}
                          onChange={(val) => {
                            const currTextFieldVal = [...textFieldVal];
                            currTextFieldVal[index] = val.target.value;
                            setTextFieldVal([...currTextFieldVal]);
                            handleStringCallBack(val.target.name, val.target.value);
                          }}
                        />
                      </Grid>);
                    default:
                      return '';
                  }
                } else {
                  return null;
                }
              })}
          </Grid>
        </Grid>
        <Grid item xs={2} md={2} container direction="row" justify="flex-start"
              alignItems="flex-start">
          <Grid item md={8} container>
            <Grid md={7}>
              <Button className="apply_btn" variant="contained" color="primary" onClick={handleApplyFilter}>
                Apply
              </Button>
            </Grid>
            <Grid md={5}>
              <Tooltip title={i18n.t('Reset filters')}>
                <IconButton color="primary" onClick={() => {
                  setReset(true);
                  setTextFieldVal(new Array(filterOptions.length).fill(""))
                  handleReset();
                }}><RotateLeftIcon/></IconButton>
              </Tooltip>
            </Grid>
          </Grid>
          <Grid md={4}>
            {(countFilter > 1 && (countFilter > 4 || window.innerWidth < 600)) ?
              <Button className="more-less_btn" color="primary"
                      onClick={handleSeeMore}>{showMore ? i18n.t('lessText') : i18n.t('moreText')}</Button> : null}
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}
