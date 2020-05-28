import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import AuthUIContainer from 'Containers/AuthUIContainer';
import Login from 'Containers/Login';

class LoginPage extends Component {
  render() {
    const { t } = this.props;
    return (
      <AuthUIContainer head={t('Welcome!')} subhead={t('LOG IN')}>
        <Login {...this.props} />
      </AuthUIContainer>
    );
  }
}

export default withTranslation()(LoginPage);
