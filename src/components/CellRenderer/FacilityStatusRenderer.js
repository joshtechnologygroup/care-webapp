import React from 'react';
import Paper from '@material-ui/core/Paper';

import './CellRenderer.scss';

const FacilityStatusRenderer = ({ value }) => {

  const getColorClass = () => {
    switch (value.toLowerCase()) {
      case 'pending': return 'paper-yellow';
      case 'accepted': return 'paper-green';
      case 'rejected': return 'paper-red';
      default: return '';
    }
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
