import React, { Component } from 'react';
import i18n from 'i18next';
import AuthUIContainer from 'Containers/AuthUIContainer';
import Login from 'Containers/Login';

class LoginPage extends Component {
  render() {
    return (
      <AuthUIContainer head={i18n.t('Welcome!')} subhead={i18n.t('LOG IN')}>
        <Login />
      </AuthUIContainer>
    );
  }
}

export default LoginPage;
