import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import CoivdBeds from './Charts/CoivdBeds';
import CovidFacilities from './Charts/CovidFacilities';
import BedsForCases from './Charts/BedsForCases';
import OccupancyStatus from './Charts/OccupancyStatus';
import { dashboardCharts } from 'Mockdata/dashboardCharts.json';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        marginBottom: 0,
    }
});

export const Dashboard = (props) => {
    const classes = useStyles();

    return (
        <Grid container justify="center" spacing="3">
            <Grid item xs={12} sm={5}>
                <Card className={classes.root}>
                    <CardContent>
                        <CoivdBeds title="Total Covid Beds" data={dashboardCharts.pieData} />
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={7}>
                <Card className={classes.root}>
                    <CardContent>
                        <OccupancyStatus title="Occupancy Status" data={dashboardCharts.occupancyStatusData} />
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
                <Card className={classes.root}>
                    <CardContent>
                        <CovidFacilities title="Covid Facilities Distribution" data={dashboardCharts.hBarData} />
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={8}>
                <Card className={classes.root}>
                    <Grid container>
                        <Grid item xs={12} sm={6}>
                            <CardContent>
                                <BedsForCases title="Beds for Confirmed Cases" data={dashboardCharts.barData} />
                            </CardContent>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <CardContent>
                                <BedsForCases title="Beds for Suspected Cases" data={dashboardCharts.barData2} />
                            </CardContent>
                        </Grid>
                    </Grid>
                </Card>
            </Grid>
        </Grid>
    );
}

export default Dashboard;
