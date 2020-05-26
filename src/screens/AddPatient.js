import React, { Component } from 'react';
import i18n from "i18next";

import PersonalDetailForm from 'Components/Forms/PersonalDetail';

class AddPatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formList: [
                'personal',
                'contact',
            ],
            profile: {
                personal: {},
                contact:  {}
            }
        }
    }
    render() {
        const { formList, profile } = this.state;
        return (
            <div>
                <h2 className="page-header header-container">{i18n.t('Add Patient')}</h2>
                <div className="page-container">
                    <PersonalDetailForm profile={profile.personal} handleSubmit={ (data) => this.onSubmit(data, formList[0]) } /> :
                </div>
            </div>
        );
    }
}

export default AddPatient;
