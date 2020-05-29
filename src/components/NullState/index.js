import React from 'react';
import { PropTypes } from 'prop-types';
import './NullState.scss';
import { Typography } from '@material-ui/core';

const NullState = (props) => {
  const { img, className, heading, msg } = props;

  return (
    <div className={`null-state ${className}`}>
      {
        img && 
        <img className="null-state" src={img} />
      }
      {
        heading &&
        <Typography variant="h5" color="primary">{heading}</Typography>
      }
      {
        msg &&
        <Typography variant="h6">{msg}</Typography>
      }
    </div>
  );
};

NullState.defaultProps = {
  className: '',
  img: '',
  heading: '',
  msg: '',
};

NullState.propTypes = {
  className: PropTypes.string,
  img: PropTypes.string,
  heading: PropTypes.string,
  msg: PropTypes.string,
};

export default NullState;
