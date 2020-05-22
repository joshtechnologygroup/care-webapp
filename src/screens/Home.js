import React from 'react';
import {
  Switch,
  Route
} from "react-router-dom";
import Grid from '@material-ui/core/Grid';

import Dashboard from 'Screens/Dashboard';
import Patients from 'Screens/Patients';
import Transfer from 'Screens/Transfer';
import Fecilities from 'Screens/Fecilities';
import Profile from 'Screens/Profile';
import Reports from 'Screens/Reports';
import Settings from 'Screens/Settings';
import ErrorPage from 'Screens/ErrorPage';
import NavigationPanel from 'Containers/NavigationPanel';


function Home() {
    return (
        <Grid container className="container-wrap">
            <Grid item xs={2} className="container-wrap__navigation">
                <NavigationPanel />
            </Grid>
            <Grid item xs={10}>
                <Switch>
                    <Route exact path={`/`} component={Patients} />
                    <Route path={`/dashboard`} component={Dashboard} />
                    <Route path={`/fecilities`} component={Fecilities} />
                    <Route path={`/patients`} component={Patients} />
                    <Route path={`/transfer`} component={Transfer} />
                    <Route path={`/reports`} component={Reports} />
                    <Route path={`/settings`} component={Settings} />
                    <Route path={`/profile`} component={Profile} />
                    <Route path={`/error/:errorCode`}>
                        <ErrorPage text="Oops! Error occured." />
                    </Route>
                    <Route path='*' exact={true}>
                        <ErrorPage title={404} text="Page Not Found!" />
                    </Route>
                </Switch>
            </Grid>
        </Grid>
    );
}

export default Home;
