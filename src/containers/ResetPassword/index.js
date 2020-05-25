import React, { useState } from "react";
import i18n from 'i18next';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { reset_password } from 'Actions/AuthAction';
import { 
  POST
} from "Src/constants";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as HttpStatus from 'http-status-codes'

function ResetPassword(props){
  const SUCCESS_TEMPLATE = "Your password has been changed, you are being re-directed to the login page"
  const ERROR = "Sorry, Something went wrong. Please contact the manager."
  const [initial_password, setInitialPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({
    initial_password: false,
    confirm_password: false,
    error_message: ''
  });
  const [success, setSuccess] = useState('');

  const handleSubmit = async () => {
    const { user_id, token } = props;
    if(!initial_password | !confirm_password | initial_password !== confirm_password){
      let error = {};
      if(!initial_password.length)
        error.initial_password = true
      else if(!confirm_password.length)
        error.confirm_password = true
      else if(initial_password !== confirm_password)
        error.error_message = 'Password Mismatch'
      setErrors({...errors, ...error});
    }
    else {
        let [ success, error_message ] = [ '', '' ]
        const body = JSON.stringify({
          'password_1': initial_password,
          'password_2': confirm_password
        })
        const status_code = await props.reset_password(POST, user_id, token, body);
        ( status_code === HttpStatus.OK ) ?
            success = SUCCESS_TEMPLATE :
            error_message = ERROR
        setSuccess(i18n.t(success));
        setErrors({
          ...errors,
          error_message: i18n.t(error_message),
        });
    }
  }

  return (
    <div className="login__content">
      <Typography variant="h5" className="mt-24">
        {i18n.t('Create a new Password')}
      </Typography>
      <TextField
        type="password"
        name="initial_password"
        variant="outlined"
        className="form-field"
        placeholder={i18n.t('Password')}
        onChange={e => setInitialPassword(e.target.value)}
        value={initial_password}
        error={errors.initial_password}
      />

      <TextField
        type="password"
        name="confirm_password"
        variant="outlined"
        className="form-field"
        placeholder={i18n.t('Confirm Password')}
        onChange={e => setConfirmPassword(e.target.value)}
        value={confirm_password}
        error={errors.confirm_password}
      />

      <Button
        variant="contained"
        color="primary"
        disableElevation
        className="btn"
        onClick={() => handleSubmit()}
      >
        {i18n.t('CHANGE PASSWORD')
      }</Button>
      <Link
        to={'/login'}
        className="text--link"
      >
        {i18n.t('Go back to Login page')}
      </Link>

      {
        errors.error_message &&
        <p className="success-box">{errors.error_message}</p>
      }
      {
        success &&
        <p className="success-box">{success}</p>
      }
    </div>
  );
}

const mapStateToProps = (state) => ({
});

ResetPassword.propTypes = {
  reset_password: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { reset_password })(ResetPassword);
