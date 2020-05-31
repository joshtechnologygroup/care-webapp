import React from 'react';
import { useTranslation } from 'react-i18next';
import Grid from '@material-ui/core/Grid';
import Header from 'Containers/Header';
import Dashboard from 'Containers/Dashboard';

export const DashboardPage = (props) => {
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
                    <Dashboard />
                </div>
            </div>
        </Grid>
    );
}

export default DashboardPage;
