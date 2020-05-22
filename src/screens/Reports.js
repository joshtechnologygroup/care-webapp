import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import ReportsList from 'Containers/ReportsList';
import GenerateReports from 'Containers/GenerateReports';
import {InsertDriveFile} from '@material-ui/icons';

export const Reports = () => {
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

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
                    onClick={handleClick}
                    startIcon={<InsertDriveFile />}
                >
                    GENERATE NEW
                </Button>
            </div>
            <div className="page-container primary-bg-light">
                <ReportsList />
                <GenerateReports open={open} onClose={handleClose} />
            </div>
        </Grid>
    );
}

export default Reports;
