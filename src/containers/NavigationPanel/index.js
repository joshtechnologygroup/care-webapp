import React from 'react';
import {
  Link,
  withRouter,
  useHistory
} from "react-router-dom";
import {useTranslation} from "react-i18next";
import Grid from '@material-ui/core/Grid';
import {
  Dashboard,
  // SettingsOutlined,
  // InsertDriveFile,
  People,
  ExitToApp,
  SyncAlt,
  LocationCity,
  AccountCircle,
  AirlineSeatIndividualSuiteOutlined,
  LocalHospitalOutlined,
  ListAlt
} from '@material-ui/icons';
import './NavigationPanel.scss';
import logo from 'Assets/images/logo.svg';
import {logout} from 'Actions/AuthAction';
import {setData, getData} from 'Utils/local-storage';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as Routes from 'Src/routes'
import * as Constants from 'Src/constants'
import {TextField, MenuItem} from '@material-ui/core';

export function NavigationPanel(props) {
  const {i18n} = useTranslation();
  const history = useHistory();

  const handleLogOut = async () => {
    const response = await props.logout();
    history.push(Routes.RELATIVE_LOGIN);
  }

  function changeLang(e) {
    setData("lang", e.target.value || 'en');
    i18n.changeLanguage(e.target.value || 'en');
  };

  function getActivatedRoute(path) {
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
          <img src={logo} alt="covid care"/>
        </Link>
        <ul className="navbar-nav clearfix">
          <li className={getActivatedRoute('/dashboard') ? 'active' : ''}>
            <Link to={'/dashboard'} className="nav-link">
              <Dashboard/>
              {i18n.t('Dashboard')}
            </Link>
          </li>
          {Constants.NAVIGATION_PERMISSION.indexOf(props.userType) >= 0 &&
          <li className={getActivatedRoute('/transfer') ? 'active' : ''}>
            <Link to={'/transfer'} className="nav-link">
              <SyncAlt/>
              {i18n.t('Transfer')}
            </Link>
          </li>
          }
          <li className={getActivatedRoute('/patients') ? 'active' : ''}>
            <Link to={'/patients'} className="nav-link">
              <People/>
              {i18n.t('Patients')}
            </Link>
            {/*<ul className="navbar-nav sub-nav clearfix">*/}
            {/*<li className={getActivatedRoute('/patients/add') ? 'active' : ''}>*/}
            {/*  <Link to={'/patients/add'} className="nav-link">*/}
            {/*    {i18n.t('Add Patient')}*/}
            {/*  </Link>*/}
            {/*</li>*/}
            {/*<li className={getActivatedRoute('/patients/hospitals') ? 'active' : ''}>*/}
            {/*  <Link to={'/patients/hospitals'} className="nav-link">*/}
            {/*    {i18n.t('Hospitals')}*/}
            {/*  </Link>*/}
            {/*</li>*/}
            {/*<li className={getActivatedRoute('/patients/hcc') ? 'active' : ''}>*/}
            {/*  <Link to={'/patients/hcc'} className="nav-link">*/}
            {/*    {i18n.t('HCC')}*/}
            {/*  </Link>*/}
            {/*</li>*/}
            {/*<li className={getActivatedRoute('/patients/care-centers') ? 'active' : ''}>*/}
            {/*  <Link to={'/patients/care-centers'} className="nav-link">*/}
            {/*    {i18n.t('Care Centers')}*/}
            {/*  </Link>*/}
            {/*</li>*/}
            {/*<li className={getActivatedRoute('/patients/private-quarantine') ? 'active' : ''}>*/}
            {/*  <Link to={'/patients/private-quarantine'} className="nav-link">*/}
            {/*    {i18n.t('Private Quarantine')}*/}
            {/*  </Link>*/}
            {/*</li>*/}
            {/*</ul>*/}
          </li>
          {Constants.NAVIGATION_PERMISSION.indexOf(props.userType) >= 0 &&
          <li className={getActivatedRoute('/inventory') ? 'active' : ''}>
            <Link to={'/inventory'} className="nav-link">
              <ListAlt/>
              {i18n.t('Inventory')}
            </Link>
          </li>
          }
          {Constants.NAVIGATION_PERMISSION.indexOf(props.userType) >= 0 &&
          <li className={getActivatedRoute('/facilities') ? 'active' : ''}>
            <Link to={'/facilities'} className="nav-link">
              <LocationCity/>
              {i18n.t('Facilities')}
            </Link>
            <ul className="navbar-nav sub-nav clearfix">
              <li className={getActivatedRoute('/facilities/beds') ? 'active' : ''}>
                <Link to={'/facilities/beds'} className="nav-link">
                  <AirlineSeatIndividualSuiteOutlined/>
                  {i18n.t('Wards / Beds')}
                </Link>
              </li>
              <li className={getActivatedRoute('/facilities/doctor-attendant') ? 'active' : ''}>
                <Link to={'/facilities/doctor-attendant'} className="nav-link">
                  <LocalHospitalOutlined/>
                  {i18n.t('Doctor / Attendant')}
                </Link>
              </li>
              {/*<li className={getActivatedRoute('/facilities/manage-users') ? 'active' : ''}>*/}
              {/*  <Link to={'/facilities/manage-users'} className="nav-link">*/}
              {/*    {i18n.t('Manage Users')}*/}
              {/*  </Link>*/}
              {/*</li>*/}
              {/*<li className={getActivatedRoute('/facilities/facility-details') ? 'active' : ''}>*/}
              {/*  <Link to={'/facilities/facility-details'} className="nav-link">*/}
              {/*    {i18n.t('Facility Details')}*/}
              {/*  </Link>*/}
              {/*</li>*/}
            </ul>
          </li>
          }
        </ul>
      </div>
      <div>
        {/* <div className="nav-divider"></div> */}
        {/* <ul className="navbar-nav clearfix">
          <li className={getActivatedRoute('/reports') ? 'active' : ''}>
            <Link to={'/reports'} className="nav-link">
              <InsertDriveFile />
              {i18n.t('Reports')}
            </Link>
          </li>
          <li className={getActivatedRoute('/settings') ? 'active' : ''}>
            <Link to={'/settings'} className="nav-link">
              <SettingsOutlined />
              {i18n.t('Settings')}
            </Link>
          </li>
        </ul> */}
        <div className="nav-divider"></div>
        <ul className="navbar-nav clearfix">
          <li className={getActivatedRoute('/profile') ? 'active' : ''}>
            <Link to={'/profile'} className="nav-link">
              <AccountCircle/>
              {i18n.t('Profile')}
            </Link>
          </li>
          <li className={getActivatedRoute('/logout') ? 'active' : ''}>
            <p className="nav-link" onClick={handleLogOut}>
              <ExitToApp/>
              {i18n.t('Logout')}
            </p>
          </li>
        </ul>
        <div className="lang-wrap">
          <h6 className="heading--sub">{i18n.t('Change language')}</h6>
          <TextField
            select
            onChange={changeLang}
            defaultValue={getData("lang") || "en"}
            fullWidth
            variant="outlined"
            className="field text-center"
          >
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="hn">Hindi</MenuItem>
          </TextField>
        </div>
      </div>
    </Grid>
  );
}

const mapStateToProps = (state) => ({
  userType: state.profile.user_type
});

NavigationPanel.propTypes = {
  userType: PropTypes.number,
  logout: PropTypes.func,
};


export default connect(mapStateToProps, {logout})(withRouter(NavigationPanel));
