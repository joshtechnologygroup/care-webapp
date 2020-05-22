import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CustomModal from 'Components/CustomModal';
import ButtonToggle from 'Components/ButtonToggle';
import CustomDateRange from 'Components/CustomDateRange';
import { ReportType, Juridiction } from 'Constants/app.const';
import useStyles from './styles';

export const GenerateReports = (props) => {
    const classes = useStyles();
    const { open, onClose } = props;
   

    const handleReport = (selected) => {
        console.log('handleReport---', selected);
    }

    const handleJuri = (selected) => {
        console.log('handleJuri--', selected);
    }

    const generateReports = () => {
        console.log('generateReports--');
    }

    const onRangeSelected = (range) => {
        console.log('onRangeSelected--', range);
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
                <Grid item xs={12}>
                    <CustomDateRange label="Select Date OR Range" onChange={onRangeSelected} />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        className={classes.button}
                        variant="contained"
                        color="primary"
                        size="medium"
                        onClick={generateReports}
                    >
                        Download
                    </Button>
                </Grid>
            </Grid>
        </CustomModal>
    );
}

export default GenerateReports;
