import React, { Component } from 'react';
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

class ResetPassword extends Component {
  SUCCESS_TEMPLATE = "Your password has been changed, your been redirected to the login page"
  ERROR = "Sorry there is an error with the server, please contact the manager"
  constructor (props) {
    super(props);
    this.state = {
      initial_password: '',
      confirm_password: '',
      errors: {
        initial_password: false,
        confirm_password: false,
        error_message: ''
      },
      success: '',
      user_id: this.props.match.params.user_id,
      token: this.props.match.params.token,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange (e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  async handleSubmit () {
    const { initial_password, confirm_password, user_id, token } = this.state;
    if(!initial_password | !confirm_password | initial_password !== confirm_password){
      let errors = {};
      if(!initial_password)
        errors.initial_password = true
      else if(!confirm_password)
        errors.confirm_password = true
      else if(initial_password !== confirm_password)
        errors.error_message = 'Password Mismatch'
      this.setState({
        errors: {...this.state.errors, ...errors},
      });
    }
    else {
        let [ success, error_message ] = [ '', '' ]
        const body = JSON.stringify({
          'password_1': initial_password,
          'password_2': confirm_password
        })
        const status_code = await this.props.reset_password(POST, user_id, token, body);
        ( status_code === HttpStatus.OK ) ?
            success = this.SUCCESS_TEMPLATE :
            error_message = this.ERROR
        this.setState({
            success: i18n.t(success),
            errors: {
                ...this.state.errors,
                error_message: i18n.t(error_message),
            },
        });
    }
  }

  render() {
    const { initial_password, confirm_password , errors, success } = this.state;
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
          onChange={this.handleChange}
          value={initial_password}
          error={errors.initial_password}
        />

        <TextField
          type="password"
          name="confirm_password"
          variant="outlined"
          className="form-field"
          placeholder={i18n.t('Confirm Password')}
          onChange={this.handleChange}
          value={confirm_password}
          error={errors.confirm_password}
        />

        <Button
          variant="contained"
          color="primary"
          disableElevation
          className="btn"
          onClick={this.handleSubmit}
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
}

const mapStateToProps = (state) => ({
});

ResetPassword.propTypes = {
  reset_password: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { reset_password })(ResetPassword);
