import React from 'react';
import { useTranslation } from "react-i18next";
import './AuthUIContainer.scss';
import Grid from '@material-ui/core/Grid';
import logo from 'Assets/images/logo.svg';

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
        <h1 className="heading--xl">{i18n.t('Manage.')}</h1>
        <h1 className="heading--xl">{i18n.t('Control.')}</h1>
        <h1 className="heading--xl">{i18n.t('Save.')}</h1>
      </Grid>
    </Grid>
  );
}

export default AuthUIContainer;
