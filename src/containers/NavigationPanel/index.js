import React from 'react';
import {
  Link
} from "react-router-dom";
import { useTranslation } from "react-i18next";
import Grid from '@material-ui/core/Grid';
import {withRouter} from 'react-router-dom'
import { Dashboard, SettingsOutlined, InsertDriveFile, People, ExitToApp, SyncAlt, LocationCity, AccountCircle  } from '@material-ui/icons';
import './NavigationPanel.scss';
import logo from 'Assets/images/logo.svg';
export function NavigationPanel(props) {
  const { i18n } = useTranslation();
  function changeLang(e) {
      i18n.changeLanguage(e.target.value || 'en');
  };
  function getActivatedRoute(path){
    return path === props.location.pathname;
  }
  return (
    <Grid
      container
      direction="column"
      justify="space-between"
      alignItems="stretch"
      className="navbar-wrap"
    >
      <div>
        <Link to={'/'} className="nav-logo">
          <img src={logo} alt="covid care" />
        </Link>
        <ul className="navbar-nav clearfix">
          <li className={getActivatedRoute('/dashboard') ? 'active' : ''}>
            <Link to={'/dashboard'} className="nav-link">
              <Dashboard   />
              {i18n.t('Dashboard')}
            </Link>
          </li>
          <li className={getActivatedRoute('/fecilities') ? 'active' : ''}>
            <Link to={'/fecilities'} className="nav-link">
              <LocationCity   />
              {i18n.t('Fecilities')}
            </Link>
          </li>
          <li className={getActivatedRoute('/patients') ? 'active' : ''}>
            <Link to={'/patients'} className="nav-link">
              <People   />
              {i18n.t('Patients')}
            </Link>
          </li>
          <li className={getActivatedRoute('/transfer') ? 'active' : ''}>
            <Link to={'/transfer'} className="nav-link">
              <SyncAlt   />
              {i18n.t('Transfer')}
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <div className="nav-divider"></div>
        <ul className="navbar-nav clearfix">
          <li className={getActivatedRoute('/reports') ? 'active' : ''}>
            <Link to={'/reports'} className="nav-link">
              <InsertDriveFile   />
              {i18n.t('Reports')}
            </Link>
          </li>
          <li className={getActivatedRoute('/settings') ? 'active' : ''}>
            <Link to={'/settings'} className="nav-link">
            <SettingsOutlined   />
              {i18n.t('Settings')}
            </Link>
          </li>
        </ul>
        <div className="nav-divider"></div>
        <ul className="navbar-nav clearfix">
          <li className={getActivatedRoute('/profile') ? 'active' : ''}>
            <Link to={'/profile'} className="nav-link">
              <AccountCircle   />
              {i18n.t('Profile')}
            </Link>
          </li>
          <li className={getActivatedRoute('/logout') ? 'active' : ''}>
            <Link to={'/logout'} className="nav-link">
              <ExitToApp   />
              {i18n.t('Logout')}
            </Link>
          </li>
        </ul>
        <div className="lang-wrap">
          <select onChange={changeLang} defaultValue={'en'}>
            <option value="en">English</option>
            <option value="hn">Hindi</option>
          </select>
        </div>
      </div>
    </Grid>
  );
}

export default withRouter(NavigationPanel);
