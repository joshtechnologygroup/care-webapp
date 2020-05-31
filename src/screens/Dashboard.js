import React from 'react';
import { useTranslation } from 'react-i18next';
import Grid from '@material-ui/core/Grid';
import Header from 'Containers/Header';
import DashboardCharts from 'Containers/DashboardCharts';

export const Dashboard = (props) => {
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
                    <DashboardCharts />
                </div>
            </div>
        </Grid>
    );
}

export default Dashboard;
