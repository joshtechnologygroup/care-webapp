import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import AuthUIContainer from 'Containers/AuthUIContainer';
import Login from 'Containers/Login';
import { getTokenCookie } from "Src/services/CookieService";
import { Redirect } from "react-router-dom";
class LoginPage extends Component {
  render() {
    const { t } = this.props;
    if(getTokenCookie())
    {
      return (
       <Redirect to='/' />
      );
    } else {
    return (
      <AuthUIContainer head={t('Welcome!')} subhead={t('LOG IN')}>
        <Login {...this.props} />
      </AuthUIContainer>
    );
  }
}
}

export default withTranslation()(LoginPage);
