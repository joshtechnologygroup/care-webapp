import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { regex } from 'Constants/app.const';
import { Typography } from '@material-ui/core';
import { login } from 'Actions/AuthAction';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Login extends Component {
  constructor (props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {
        email: false,
        password: false,
        form: ''
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange (e) {
    const { name, value } = e.target;
    const errors = {};
    switch (name) {
      case 'email':
        errors.email = (regex.email).test(value) ? false : true;
        break;
      case 'password':
        errors.password = value ? false : true;
        break;
      default: break;
    }
    this.setState({
      errors: {...this.state.errors, ...errors},
      [name]: value,
    });
  }

  async handleSubmit (e) {
    e.preventDefault();
    let emailError =false,
        passwordError = false;
    if (!this.state.email) {
      emailError = true;
    }
    if (!this.state.password) {
      passwordError = true;
    }
    if (emailError || passwordError) {
      this.setState({
        errors: {
          ...this.state.errors,
          email: emailError,
          password: passwordError
        }
      });
    }
    else {
      const { email, password, errors } = { ...this.state };
      const { login, history } = { ...this.props }
      const response = await login(email, password);
      if(response.status){
          history.push('/')
      } else {
        this.setState({
          errors: {
            ...errors,
            form: this.props.t(response.error_message)
          }
        });
      }
    }
  }

  render() {
    const { email, password, errors } = this.state;
    const { t } = this.props;
    return (
      <form className="login__content" onSubmit={this.handleSubmit}>
        {
          errors.form &&
          <Typography className="mt-24" variant="h5" color="error">
            {errors.form}
          </Typography>
        }
        <TextField
          type="email"
          name="email"
          variant="outlined"
          className="form-field"
          placeholder={t('Email')}
          onChange={this.handleChange}
          value={email} 
          error={errors.email}
        />
        <TextField
          type="password"
          name="password"
          variant="outlined"
          className="form-field"
          placeholder={t('Password')}
          onChange={this.handleChange}
          value={password}
          error={errors.password}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disableElevation
          size="medium"
          className="btn"
          disabled={errors.email || errors.password}
        >
          {t('LOG IN')}
        </Button>
        <Link
          to={'/forgot-password'}
          color="primary"
          underline="hover"
          className="text--link"
        >
          {t('Forgot Password?')}
        </Link>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
});

Login.propTypes = {
  login: PropTypes.func.isRequired,
};


export default connect(mapStateToProps, { login })(withTranslation()(Login));
