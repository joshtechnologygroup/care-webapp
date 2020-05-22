import React, { Component } from 'react';
import i18n from 'i18next';
import { LocalPhoneOutlined } from '@material-ui/icons'
import { Link } from 'react-router-dom';
import AuthUIContainer from 'Containers/AuthUIContainer';

class ContactPage extends Component {

  render() {
    return (
      <AuthUIContainer head={i18n.t('Still having a problem?')}>
        <h1 className="contact-heading mt-24">
          <LocalPhoneOutlined
            color="primary"
            fontSize="large"
          />
          <a
            href={'tel: 99999 99999'}
            className="heading--lg text--link m-0"
          >
            99999 99999
          </a>
        </h1>
        <Link
          to={'/login'}
          className="text--link"
        >
          {i18n.t('back to login page')}
        </Link>
      </AuthUIContainer>
    );
  }
}

export default ContactPage;
