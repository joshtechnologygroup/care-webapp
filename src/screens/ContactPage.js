import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { LocalPhoneOutlined } from '@material-ui/icons'
import { Link } from 'react-router-dom';
import AuthUIContainer from 'Containers/AuthUIContainer';

class ContactPage extends Component {

  render() {
    const { t } = this.props;
    return (
      <AuthUIContainer head={t('Still having a problem?')}>
        <h1 className="contact-heading mt-24">
          <LocalPhoneOutlined
            color="primary"
            fontSize="large"
          />
          <a
            href={'tel: 9999999999'}
            className="heading--lg text--link m-0"
          >
            99999 99999
          </a>
        </h1>
        <Link
          to={'/login'}
          className="text--link"
        >
          {t('Go back to Login page')}
        </Link>
      </AuthUIContainer>
    );
  }
}

export default withTranslation()(ContactPage);
