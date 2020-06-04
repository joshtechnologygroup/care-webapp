import React from 'react';
import PropTypes from 'prop-types';
import { IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import './toaster.scss';

const Toast = (props) => {
  const { toast: {
      title,
      desc,
      severity,
      id,
    },
    deteleCallback,
  } = props;

  return (
    <div className={`toast toast--${severity}`}>
      <div>
        <h4 className="toast__title">{title}</h4>
        <p className="toast__desc">{desc}</p>
      </div>
      <IconButton className="ml-10 p-7" onClick={() => deteleCallback(id)}>
        <Close fontSize="large" />
      </IconButton>
    </div>
  );
}

Toast.propTypes = {
  toast: PropTypes.object.isRequired,
  deteleCallback: PropTypes.func
}

export default Toast;
