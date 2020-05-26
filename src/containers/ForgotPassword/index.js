import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { regex } from 'Constants/app.const';
import { forgot_password } from 'Actions/AuthAction';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as HttpStatus from 'http-status-codes'
import * as StringUtils from 'Src/utils/stringformatting';

class ForgotPassword extends Component {
  SUCCESS_TEMPLATE = 'If an account exists for {0}, an e-mail will be sent with further instructions.';
  FORM_TEMPLATE = 'This email is not registered with us.';
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

  async handleSubmit () {
    if (!this.state.email) {
      this.setState({
        errors: {
          ...this.state.errors,
          email: true,
        }
      });
    }
    else {
      let [ success, form ] = [ '', '' ];
      const { errors, email } = this.state
      const status_code = await this.props.forgot_password(email);
      
      ( status_code === HttpStatus.OK ) ?
          success = StringUtils.formatVarString(this.SUCCESS_TEMPLATE, [email]):
          form = StringUtils.formatVarString(this.FORM_TEMPLATE, [])
      this.setState({
          success: this.props.t(success),
          errors: {
              ...errors,
              form: this.props.t(form),
          },
      });
    }
  }

  render() {
    const { email, errors, success } = this.state;
    const { t } = this.props;
    return (
      <div className="login__content">
        <Typography variant="h5" className="mt-24">
          {t('enter_email_text')}
        </Typography>
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
        <Button
          variant="contained"
          color="primary"
          disableElevation
          className="btn"
          onClick={this.handleSubmit}
        >
          {t('SUBMIT')
        }</Button>
        <Link
          to={'/login'}
          className="text--link"
        >
          {t('Go back to Login page')}
        </Link>
        {/* <Link
          to={'/contact'}
          className="text--link mt-10"
        >
          {t('Still having a problem. Need Help.')}
        </Link> */}
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

const mapStateToProps = (state) => ({
});

ForgotPassword.propTypes = {
    forgot_password: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { forgot_password })(withTranslation()(ForgotPassword));
