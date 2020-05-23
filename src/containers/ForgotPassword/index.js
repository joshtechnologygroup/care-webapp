import React, { Component } from 'react';
import i18n from 'i18next';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { regex } from 'Constants/app.const';

class ForgotPassword extends Component {
  constructor (props) {
    super(props);
    this.state = {
      email: '',
      errors: {
        email: false,
        form: ''
      },
      success: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange (e) {
    const { name, value } = e.target;
    const errors = {};
    errors.email = (regex.email).test(value) ? false : true;
    this.setState({
      errors: {...this.state.errors, ...errors},
      [name]: value,
    });
  }

  handleSubmit () {
    if (!this.state.email) {
      this.setState({
        errors: {
          ...this.state.errors,
          email: true,
        }
      });
    }
    else {
      this.setState({
        errors: {
          ...this.state.errors,
          form: i18n.t('This email is not registered with us.')
        },
        success: i18n.t(' If an account exists for {{EMAIL}}, an e-mail will be sent with further instructions.', {EMAIL: this.state.email})
      });
    }
  }

  render() {
    const { email, errors, success } = this.state;
    return (
      <div className="login__content">
        <Typography variant="h5" className="mt-24">
          {i18n.t('Enter your email address to reset your password. You may need to check your spam folder in your email.')}
        </Typography>
        <TextField
          type="email"
          name="email"
          variant="outlined"
          className="form-field"
          placeholder={i18n.t('Email')}
          onChange={this.handleChange}
          value={email}
          error={errors.email}
        />
        <Button
          variant="contained"
          color="primary"
          disableElevation
          className="btn"
          onClick={this.handleSubmit}
        >
          {i18n.t('SUBMIT')
        }</Button>
        <Link
          to={'/login'}
          className="text--link"
        >
          {i18n.t('Go back to Login page')}
        </Link>
        <Link
          to={'/contact'}
          className="text--link mt-10"
        >
          {i18n.t('Still having a problem. Need Help.')}
        </Link>
        {
          errors.form &&
          <p className="success-box">{errors.form}</p>
        }
        {
          success &&
          <p className="success-box">{success}</p>
        }
      </div>
    );
  }
}

export default ForgotPassword;
