import React from 'react';
import Grid from '@material-ui/core/Grid';
import CustomModal from 'Components/CustomModal';
import ButtonToggle from 'Components/ButtonToggle';
import { ReportType, Juridiction } from 'Constants/app.const';

export const GenerateReports = (props) => {
    const { open, onClose } = props;
   

    const handleReport = (selected) => {
        console.log('handleReport---', selected);
    }

    const handleJuri = (selected) => {
        console.log('handleJuri--', selected);
    }

    return (
        <CustomModal open={open} onClose={onClose} title="Generate Reports">
             <Grid container spacing={3}>
                <Grid item xs={6}>
                    <ButtonToggle label="Select Report Type" defaultSelected="patient" data={ReportType} onChange={handleReport} />
                </Grid>
                <Grid item xs={6}>
                    <ButtonToggle label="Select Juridiction" defaultSelected="PCMC" data={Juridiction} onChange={handleJuri} />
                </Grid>
            </Grid>
        </CustomModal>
    );
}

export default GenerateReports;
