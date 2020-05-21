import React from 'react';
import GetAppIcon from '@material-ui/icons/GetApp';

const Icons = (item) => {
  // const { value } = item;

  return (
    <React.Fragment>
      <div className="ag-cell-icon-wrap">
        <a href="http://www.africau.edu/images/default/sample.pdf" target="_blank" rel="noopener noreferrer" download>
          <GetAppIcon fontSize="large" color="primary" />
        </a>
      </div>
    </React.Fragment>
  );
};

export default Icons;
