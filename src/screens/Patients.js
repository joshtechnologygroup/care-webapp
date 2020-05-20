import React, { Component } from 'react';
import i18n from "i18next";
import Grid from 'Components/grid/Grid';

class Patients extends Component {
    render() {
        return (
            <div>
                <h2>{i18n.t('Patients')}</h2>
                <Grid />
            </div>
        );
    }
}

export default Patients;
