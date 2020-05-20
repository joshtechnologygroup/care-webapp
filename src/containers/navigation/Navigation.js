import React from 'react';
import {
  Link
} from "react-router-dom";
import { useTranslation } from "react-i18next";
import './Navigation.scss';
import { Dashboard, SettingsOutlined, InsertDriveFile, People, ExitToApp, SyncAlt, LocationCity  } from '@material-ui/icons';

export function Navigation() {
  const { i18n } = useTranslation();
  function changeLang(e) {
      i18n.changeLanguage(e.target.value || 'en');
  };
  return (
    <ul className="navbar-nav clearfix">
        <li>
          <Link to={'/'} className="nav-link">
            
          {i18n.t('Covid Control')}
          </Link>
        </li>
        <li>
          <Link to={'/dashboard'} className="nav-link">
            <Dashboard   />
            {i18n.t('Dashboard')}
          </Link>
        </li>
        <li>
          <Link to={'/fecilities'} className="nav-link">
            <LocationCity   />
            {i18n.t('Fecilities')}
          </Link>
        </li>
        <li>
          <Link to={'/patients'} className="nav-link">
            <People   />
            {i18n.t('Patients')}
          </Link>
        </li>
        <li>
          <Link to={'/transfer'} className="nav-link">
            <SyncAlt   />
            {i18n.t('Transfer')}
          </Link>
        </li>
        <li>
          <Link to={'/reports'} className="nav-link">
            <InsertDriveFile   />
            {i18n.t('Reports')}
          </Link>
        </li>
        <li>
          <Link to={'/settings'} className="nav-link">
          <SettingsOutlined   />
            {i18n.t('Settings')}
          </Link>
        </li>
        <li>
          <Link to={'/profile'} className="nav-link">
            <ExitToApp   />
            {i18n.t('Profile')}
          </Link>
        </li>
        <li>
          <Link to={'/profile'} className="nav-link">
            <ExitToApp   />
            {i18n.t('Logout')}
          </Link>
        </li>
        <div className="lang-wrap">
          <span>
            {i18n.t('Language')}
          </span>
          <select id="cars" onChange={changeLang} defaultValue={'en'}>
            <option value="en">English</option>
            <option value="hn">Hindi</option>
          </select>
        </div>
    </ul>
  );
}

export default Navigation;