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
import Navigation from 'Containers/navigation/Navigation';


function Home() {
    return (
        <Grid container className="container-wrap">
            <Grid item xs={2}>
                <Navigation />
            </Grid>
            <Grid item xs={10} className="container">
                <Switch>
                    <Route exact path={`/`} component={Patients} />
                    <Route path={`/dashboard`} component={Dashboard} />
                    <Route path={`/fecilities`} component={Fecilities} />
                    <Route path={`/patients`} component={Patients} />
                    <Route path={`/transfer`} component={Transfer} />
                    <Route path={`/reports`} component={Reports} />
                    <Route path={`/settings`} component={Settings} />
                    <Route path={`/profile`} component={Profile} />
                    <Route path='*' exact={true}>
                        <ErrorPage type={404}/>
                    </Route>
                </Switch>
            </Grid>
        </Grid>
    );
}

export default Home;