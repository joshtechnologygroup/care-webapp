import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  FormControl,
  Select,
  MenuItem
} from '@material-ui/core';
import styles from './styles';
import { FacilityStatus} from "Constants/app.const"

import './CellRenderer.scss';

const FacilityStatusRenderer = ({ value, data }) => {
  const [statue, setStatus] = useState(FacilityStatus[0].value);
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const getColorClass = () => {
    switch (value.toLowerCase()) {
      case 'pending': return 'paper-yellow';
      case 'accepted': return 'paper-green';
      case 'rejected': return 'paper-red';
      default: return '';
    }
  }

  const handleChange = (e) => {
    console.log('row data-----', data);
    console.log('selected status-----', e.target.value);
    setStatus(e.target.value);
  }

  if(value === 'Pending') { // TODO: this condition is to check Admin role or Facility owner
    return (
      <FormControl className={classes.formControl}>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={statue}
          onChange={handleChange}
        >
          {FacilityStatus.map( item => (
            <MenuItem key={item.value} value={item.value}>{item.title}</MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }
  return (
    <div className="renderer-container">
      <Paper elevation={0}>
        <div className={`renderer-container__paper renderer-container__${getColorClass()}`}>{value}</div>
      </Paper>
    </div>
  );
};

export default FacilityStatusRenderer;
