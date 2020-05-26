import React from 'react';
import { useTranslation } from "react-i18next";
import './AuthUIContainer.scss';
import Grid from '@material-ui/core/Grid';
import logo from 'Assets/images/logo.svg';
import { PropTypes } from 'prop-types';

export function AuthUIContainer(props) {
  const { i18n } = useTranslation();
  return (
    <Grid container
      spacing={0}
      className="login"
    >
      <Grid
          container
          item md={5}
          className="login__right-pane"
          justify="center"
          alignItems="center"
          direction="column"
      >
        <div className="login__content">
          {
            props.head &&
            <h1 className="heading--lg">{props.head}</h1>
          }
          {
            props.subhead &&
            <h5 className="text--secondary text--uppercase">{props.subhead}</h5>
          }
          {props.children}
        </div>
      </Grid>
      <Grid
        item md={7} xs={12}
        className="login__left-pane"
      >
        <div className="login__logo">
          <img src={logo} alt={i18n.t('Covid Control')} />
        </div>
        <h1 className="heading--xl">
          <span>{i18n.t('Login_Manage')}</span>
          <span>{i18n.t('Login_Control')}</span>
          <span>{i18n.t('Login_Save')}</span>
        </h1>
      </Grid>
    </Grid>
  );
}

AuthUIContainer.propTypes = {
  head: PropTypes.string,
  subhead: PropTypes.string
};

AuthUIContainer.defaultProps = {
  head: '',
  subhead: ''
};

export default AuthUIContainer;
