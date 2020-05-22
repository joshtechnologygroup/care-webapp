import React, { Component } from 'react';
import i18n from "i18next";
import Grid from '@material-ui/core/Grid';

import DynamicDoughnut from 'Containers/Charts/DynamicDoughnut';
import HorizontalBar from 'Containers/Charts/HorizontalBar';
import Bar from 'Containers/Charts/Bar';
import Pie from 'Containers/Charts/Pie';


class Dashboard extends Component {
    render() {
        return (
            <div>
                <h2>{i18n.t('Dashboard')}</h2>
                <Grid container className="container-wrap">
                    <Grid item xs={5}>
                        <DynamicDoughnut />
                    </Grid>
                    <Grid item xs={2} />
                    <Grid item xs={5}>
                        <Pie />
                    </Grid>
                    <Grid item xs={7}>
                        <Bar />
                    </Grid>
                    <Grid item xs={5}>
                        <HorizontalBar />
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default Dashboard;
