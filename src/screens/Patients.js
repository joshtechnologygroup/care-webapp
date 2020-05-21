import React, { Component } from 'react';
import i18n from "i18next";
import PatientsList from 'Containers/PatientsList';

class Patients extends Component {
    render() {
        return (
            <div>
                <h2>{i18n.t('Patients')}</h2>
                <PatientsList />
            </div>
        );
    }
}

export default Patients;
