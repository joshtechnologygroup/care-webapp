import React from 'react';
import { PropTypes } from 'prop-types';
import './NullState.scss';
import { Typography } from '@material-ui/core';

const NullState = (props) => {
  const { img, className, heading, message } = props;

  return (
    <div className={`null-state ${className}`}>
      {
        img && 
        <img className="null-state" src={img} alt={heading ? heading : message} />
      }
      {
        heading &&
        <Typography variant="h5" color="primary">{heading}</Typography>
      }
      {
        message &&
        <Typography variant="h6">{message}</Typography>
      }
    </div>
  );
};

NullState.defaultProps = {
  className: '',
  img: '',
  heading: '',
  message: '',
};

NullState.propTypes = {
  className: PropTypes.string,
  img: PropTypes.string,
  heading: PropTypes.string,
  message: PropTypes.string,
};

export default NullState;
