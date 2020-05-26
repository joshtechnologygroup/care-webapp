import React, { Component } from 'react';
import i18n from "i18next";
import PersonalDetail from 'Components/Cards/PersonalDetail';
import PersonalDetailForm from 'Components/Forms/PersonalDetail';
import ContactDetail from 'Components/Cards/ContactDetail';
import ContactDetailForm from 'Components/Forms/ContactDetail';

// Importing mock data: Please remove upon integration
import { patientDetail } from 'Mockdata/patientDetail.json';

class PatientDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formList: [
        'personal',
        'contact',
      ],
      isEditing: {
        personal: false,
        contact: false
      },
      profile: patientDetail
    }
    this.setEditable = this.setEditable.bind(this);
  }
  setEditable = (key, value) => {
    this.setState({
      isEditing: {
        ...this.state.isEditing,
        [key]: value
      }
    });
  }
  onSubmit = (data, key) => {
    console.log("submit", key, data);
    this.setState({
      profile: {
        ...this.state.profile,
        [key]: data
      },
      isEditing: {
        ...this.state.isEditing,
        [key]: false
      }
    })
  }
  render() {
    const { formList, isEditing, profile } = this.state;
    return (
      <div>
        <h2 className="page-header header-container">{i18n.t('Patient Detail')}</h2>
        <div className="page-container">
          {
            isEditing[formList[0]] ? 
            <PersonalDetailForm
              profile={profile.personal}
              handleSubmit={ (data) => this.onSubmit(data, formList[0]) }
              editMode={true}
            /> :
            <PersonalDetail
              profile={profile.personal}
              handleEdit={ () => this.setEditable(formList[0], true) }
            />
          }
          {
            isEditing[formList[1]] ?
            <ContactDetailForm
              profile={profile.contact}
              handleSubmit={ (data) => {this.onSubmit(data, formList[1])} }
              editMode={true}
            />:
            <ContactDetail
              profile={profile.contact}
              handleEdit={ () => this.setEditable(formList[1], true) }
            />
          }
        </div>
      </div>
    );
  }
}

export default PatientDetail;
