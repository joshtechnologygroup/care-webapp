import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Header from 'Containers/Header';

import AppPie from 'Containers/Charts/Pie';
import HorizontalBar from 'Containers/Charts/HorizontalBar';
import Bar from 'Containers/Charts/Bar';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginBottom: 0,
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

export const Dashboard = (props) => {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <Grid
            container
            direction="column"
            className="outer-container"
        >
            <div className="primary-bg-light">
                <Header>
                    <h2>{t('Dashboard')}</h2>
                </Header>
                <div className="table-container">
                    <Grid container justify="center" spacing="3">
                        <Grid item xs={6}>
                            <Card className={classes.root}>
                                <CardContent>
                                    <AppPie />
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
            </div>
        </Grid>
    );
}

export default Dashboard;
