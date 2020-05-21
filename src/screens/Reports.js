import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ReportsList from 'Containers/ReportsList';
import {InsertDriveFile} from '@material-ui/icons';

class Reports extends Component {
    render() {
        return (
            <Grid
                container
                direction="column"
                justify="flex-start"
                alignItems="stretch"
            >
                <div className="page-header">
                    <Button
                        variant="contained"
                        color="primary"
                        size="medium"
                        startIcon={<InsertDriveFile />}
                    >
                        GENERATE NEW
                    </Button>
                </div>
                <div className="page-container primary-bg-light">
                    <ReportsList />
                </div>
            </Grid>
        );
    }
}

export default Reports;
