import React from 'react';
import AgProvider from 'Containers/AgProvider';
import GetAppIcon from '@material-ui/icons/GetApp';

const Icons = (item) => {
  // const { value } = item;

  return (
    <AgProvider>
      <div className="ag-cell-icon-wrap">
        <a href="http://www.africau.edu/images/default/sample.pdf" target="_blank" rel="noopener noreferrer" download>
          <GetAppIcon fontSize="large" color="primary" />
        </a>
      </div>
    </AgProvider>
  );
};

export default Icons;
