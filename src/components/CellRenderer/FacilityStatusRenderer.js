import React, { useState } from 'react';
import { connect } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper,
} from '@material-ui/core';
import _ from 'underscore';

import styles from './styles';
import { FacilityStatus, TRANSFER_STATUS_CHOICES } from "Constants/app.const"
import { updateTransferStatus } from "Actions/TransferAction";

import './CellRenderer.scss';

const FacilityStatusRenderer = ({ value, data, updateStatus }) => {
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
    updateStatus(data.id, {
        status: _.invert(TRANSFER_STATUS_CHOICES)[e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)]
    });
    setStatus(e.target.value);
  }

//   if(value === 'Pending') { // TODO: this condition is to check Admin role or Facility owner
//     return (
//       <FormControl className={classes.formControl}>
//         <Select
//           labelId="demo-simple-select-label"
//           id="demo-simple-select"
//           value={statue}
//           onChange={handleChange}
//         >
//           {FacilityStatus.map( item => (
//             <MenuItem key={item.value} value={item.value}>{item.title}</MenuItem>
//           ))}
//         </Select>
//       </FormControl>
//     );
//   }
  return (
    <div className="renderer-container">
      <Paper elevation={0}>
        <div className={`renderer-container__paper renderer-container__${getColorClass()}`}>{value}</div>
      </Paper>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
    return {
        updateStatus: (patientTransferId, body) => {
            dispatch(updateTransferStatus(patientTransferId, body));
        },
    };
};

export default connect(null, mapDispatchToProps)(FacilityStatusRenderer);
