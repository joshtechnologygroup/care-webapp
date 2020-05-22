import React, { Component } from 'react';
import PatientsList from 'Containers/PatientsList';
import { Grid } from '@material-ui/core';
import Header from '../containers/Header';

class Patients extends Component {
    render() {
        return (
            <Grid
                container
                direction="column"
                className="outer-container"
            >
                <div className="primary-bg-light">
                    <Header searchPlaceholder='Search Patient name or ID'/>
                    <div className="table-container">
                        <PatientsList />
                    </div>
                </div>
            </Grid>
        );
    }
}

export default Patients;
