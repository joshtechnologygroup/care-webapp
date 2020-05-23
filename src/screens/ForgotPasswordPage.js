import React, { Component } from 'react';
import i18n from 'i18next';
import AuthUIContainer from 'Containers/AuthUIContainer';
import ForgotPassword from 'Containers/ForgotPassword';

class ForgotPasswordPage extends Component {
  render() {
    return (
      <AuthUIContainer subhead={i18n.t('Forgot your password')}>
        <ForgotPassword />
      </AuthUIContainer>
    );
  }
}

export default ForgotPasswordPage;
