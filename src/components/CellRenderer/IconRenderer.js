import React from 'react';
import Icon from 'constants/icon';
import { SvgIcon } from '@material-ui/core';
import constants from 'constants/app-constants';

const Icons = (item) => {
  const { value } = item;
  if (!value || !value.title) {
    return null;
  }
  return (
    <React.Fragment>
      <div className="ag-cell-icon-wrap">
        <SvgIcon className="ag-cell-icon" viewBox={constants.VIEW_BOX.size16x16}>
          {Icon[value.title]}
        </SvgIcon>
      </div>
    </React.Fragment>
  );
};

export default Icons;
