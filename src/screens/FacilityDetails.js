import React, { Component } from 'react';
import i18n from "i18next";
import BasicDetail from 'Containers/Facilities/BasicDetail';
import BasicDetailsForm from 'Containers/Facilities/BasicDetailsForm';
import InchargeContactDetail from 'Containers/Facilities/InchargeContactDetail';

// Importing mock data: Please remove upon integration
import { facilityDetails } from 'Mockdata/facilityDetails.json';

class FacilityDetails extends Component {
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
      profile: facilityDetails
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
        <h2 className="page-header header-container">{i18n.t('Facility Detail')}</h2>
        <div className="page-container">
          {
            isEditing[formList[0]] ? 
            <BasicDetailsForm
              profile={profile.contact}
              handleSubmit={ (data) => this.onSubmit(data, formList[0]) }
              editMode={true}
            /> :
            <BasicDetail
              profile={profile.contact}
              handleEdit={ () => this.setEditable(formList[0], true) }
            />
          }
        <InchargeContactDetail
            profile={profile.inchargeContactDetails}
            handleSubmit={ (data) => {this.onSubmit(data, formList[1])} }
            editMode={true}
        />
        </div>
      </div>
    );
  }
}

export default FacilityDetails;
