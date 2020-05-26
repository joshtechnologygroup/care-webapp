import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import AuthUIContainer from 'Containers/AuthUIContainer';
import ForgotPassword from 'Containers/ForgotPassword';

class ForgotPasswordPage extends Component {
  render() {
    const { t } = this.props;
    return (
      <AuthUIContainer subhead={t('Forgot your password')}>
        <ForgotPassword />
      </AuthUIContainer>
    );
  }
}

export default withTranslation()(ForgotPasswordPage);
