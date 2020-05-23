import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import i18n from "i18next";
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import DynamicDoughnut from 'Containers/Charts/DynamicDoughnut';
import HorizontalBar from 'Containers/Charts/HorizontalBar';
import Bar from 'Containers/Charts/Bar';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export const Dashboard = () => {
    const classes = useStyles();
    return (
        <div className="page-container">
            <h2>{i18n.t('Dashboard')}</h2>
            <Grid container justify="center" spacing="4" className="container-wrap">
                <Grid item xs={5}>
                    <Card className={classes.root}>
                        <CardContent>
                            <DynamicDoughnut />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={6}>
                    <Card className={classes.root}>
                        <CardContent>
                            <HorizontalBar />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card className={classes.root}>
                        <CardContent>
                            <HorizontalBar />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={8}>
                    <Card className={classes.root}>
                        <Grid container>
                            <Grid item xs={6}>
                                <CardContent>
                                    <Bar />
                                </CardContent>
                            </Grid>
                            <Grid item xs={6}>
                                <CardContent>
                                    <Bar />
                                </CardContent>
                            </Grid> 
                        </Grid> 
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
}

export default Dashboard;
