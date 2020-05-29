import React, { Component } from 'react';
import i18n from "i18next";

import PersonalDetailForm from 'Components/Forms/PersonalDetail';
import ContactDetailForm from 'Components/Forms/ContactDetail';
import MedicationDetailForm  from 'Containers/Patient/MedicationDetail/MedicationDetailForm';

import Header from 'Containers/Header';
import { Button } from '@material-ui/core';

class AddPatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formList: [
        'personal',
        'contact',
        'medication',
      ],
      profile: {
        personal: {},
        contact:  {},
        medication: {
          clinicalStatus: '',
          covidStatus: '',
          symptoms: [],
          nonCovidDiseases: [],
          attendant: [],
        }
      }
    }
  }

  handleSubmit = () => {
    console.log("Submit")
  };
  render() {
    const { formList, profile } = this.state;
    return (
      <>
        <Header>
          <h2>{i18n.t('Add Patient')}</h2>
          <Button
            variant="contained"
            color="primary"
            disableElevation
            className="btn py-5 ml-auto"
            onClick={this.handleSubmit}
          >
            {i18n.t('Save')}
          </Button>
        </Header>
        <div className="page-container">
          <PersonalDetailForm
            profile={profile.personal}
            handleSubmit={ (data) => this.onSubmit(data, formList[0]) }
          />
          <ContactDetailForm
            profile={profile.contact}
            handleSubmit={ (data) => this.onSubmit(data, formList[1]) }
          />
          <MedicationDetailForm
            profile={profile[formList[2]]}
            handleSubmit={ (data) => {this.onSubmit(data, formList[2])} }
          />
        </div>
      </>
    );
  }
}

export default AddPatient;
