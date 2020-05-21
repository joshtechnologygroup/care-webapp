import { Link } from 'react-router-dom';
import React from 'react';
import { getFormattedName, getFlightDetailUrl } from 'AppUtils';
import Icon from 'constants/icon';
import { SvgIcon } from '@material-ui/core';
import constants from 'constants/app-constants';

const NameRenderer = (item) => {
  const {
    firstName, lastName, data, shouldUseLink,
  } = item;
  if (data.isFullWidth) {
    return '';
  }
  const text = getFormattedName(data[firstName], data[lastName]);

  return shouldUseLink ? (
    <Link
      className="ag-cell-link"
      to={getFlightDetailUrl(data.flight.id, data.id)}
    >
      {text}
      {
        data.infants && data.infants.length && (
          <span className="ag-infant-details">
            <span>{`+${data.infants.length}`}</span>
            <SvgIcon className="ag-cell-icon" viewBox={constants.VIEW_BOX.size14x14}>
              {Icon.vboxInfants}
            </SvgIcon>
          </span>
        )
      }
    </Link>
  ) : (
    <span className="ag-name-no-link">
      {text}
      {data.infants && data.infants.length && (
        <span className="ag-infant-details">
          <span>{`+${data.infants.length}`}</span>
          <SvgIcon className="ag-cell-icon" viewBox={constants.VIEW_BOX.size16x16}>
            {Icon.vboxInfants}
          </SvgIcon>
        </span>
      )}
    </span>
  );
};

export default NameRenderer;
