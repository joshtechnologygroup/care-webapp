import React from 'react';
import { PropTypes } from 'prop-types';
import './Loader.scss';

const Loader = (props) => {
  const { className } = props;

  return (
    <div className={`lds-ring ${className}`}>
      <div />
      <div />
      <div />
      <div />
    </div>
  );
};

Loader.defaultProps = {
  className: '',
};

Loader.propTypes = {
  className: PropTypes.string,
};

export default Loader;
