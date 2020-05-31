import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import AppDoughnut from 'Components/Charts/Doughnut';
import HorizontalBar from 'Components/Charts/HorizontalBar';
import Bar from 'Components/Charts/Bar';
import { dashboardCharts } from 'Mockdata/dashboardCharts.json';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        marginBottom: 0,
    }
});

export const DashboardCharts = (props) => {
    const classes = useStyles();

    return (
        <Grid container justify="center" spacing="3">
            <Grid item xs={6}>
                <Card className={classes.root}>
                    <CardContent>
                        <AppDoughnut data={dashboardCharts.pieData} />
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={6}>
                <Card className={classes.root}>
                    <CardContent>
                        <HorizontalBar data={dashboardCharts.hBarData} />
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={4}>
                <Card className={classes.root}>
                    <CardContent>
                        <HorizontalBar data={dashboardCharts.hBarData} />
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={8}>
                <Card className={classes.root}>
                    <Grid container>
                        <Grid item xs={6}>
                            <CardContent>
                                <Bar data={dashboardCharts.barData} />
                            </CardContent>
                        </Grid>
                        <Grid item xs={6}>
                            <CardContent>
                                <Bar data={dashboardCharts.barData} />
                            </CardContent>
                        </Grid>
                    </Grid>
                </Card>
            </Grid>
        </Grid>
    );
}

export default DashboardCharts;
