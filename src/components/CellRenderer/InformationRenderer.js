import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  SvgIcon,
  Popover,
  withStyles,
} from '@material-ui/core';
import AgProvider from 'AppContainers/AgProvider';
import Icon from 'constants/icon';
import constants from 'constants/app-constants';
import InfoTooltip from 'AppComponents/ToolTips/Info';
import styles from './styles';

const InformationRenderer = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    const { tooltipEnabled } = props;
    if (tooltipEnabled) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const renderToolTip = (type, value) => {
    switch (type) {
      case 'information':
        return <InfoTooltip data={value} />;

      default:
        return (value && value.text) ? <InfoTooltip data={value} /> : null;
    }
  };

  const { classes, value, colDef } = props;
  const open = Boolean(anchorEl);
  if (!value) {
    return null;
  }
  return (
    <AgProvider>
      <div className="ag-cell-icon-wrap">
        <SvgIcon
          className="ag-cell-icon"
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
          viewBox={constants.VIEW_BOX.size16x16}
        >
          {Icon.info}
        </SvgIcon>
      </div>
      {
        <Popover
          elevation={2}
          className={classes.popover}
          anchorPosition={{
            top: -5,
            left: -20,
          }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          id="mouse-over-popover"
          classes={{
            paper: classes.paper,
          }}
          open={open}
          anchorEl={anchorEl}
          onClose={handlePopoverClose}
          disableRestoreFocus
        >
          {renderToolTip(colDef.field, value)}
        </Popover>
      }
    </AgProvider>
  );
};

InformationRenderer.defaultProps = {
  colDef: null,
  classes: null,
  value: null,
  tooltipEnabled: false,
};

InformationRenderer.propTypes = {
  colDef: PropTypes.object,
  classes: PropTypes.object,
  value: PropTypes.object,
  tooltipEnabled: PropTypes.bool,
};

export default withStyles(styles)(InformationRenderer);
