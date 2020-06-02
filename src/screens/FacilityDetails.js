import React, { Component } from 'react';
import i18n from "i18next";
import BasicDetail from 'Containers/Facilities/BasicDetail';
import BasicDetailsForm from 'Containers/Facilities/BasicDetailsForm';
import InchargeContactDetail from 'Containers/Facilities/InchargeContactDetail';
import _ from "underscore";
// Importing mock data: Please remove upon integration
import { facilityDetails } from 'Mockdata/facilityDetails.json';
import { connect } from "react-redux";
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
        <h2 className="page-header header-container">{i18n.t('Facility Details')}</h2>
        <div className="page-container">
          {
            isEditing[formList[0]] ? 
            <BasicDetailsForm
              profile={profile.contact}
              districtsList={this.props.districtsList}
              ownershipTypesList={this.props.ownershipTypesList}
              facilityTypesList={this.props.facilityTypesList}
              handleSubmit={ (data) => this.onSubmit(data, formList[0]) }
              editMode={true}
            /> :
            <BasicDetail
              profile={profile.contact}
              districtsList={this.props.districtsList}
              ownershipTypesList={this.props.ownershipTypesList}
              facilityTypesList={this.props.facilityTypesList}
              currentStatus={this.props.currentStatus}
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


FacilityDetails.defaultProps = {
  fetchPatientDetailsDependencies: () => {},
  queryParams: {},
  count: 0,
  value: "",
  error:null,
};

const mapStateToProps = state => {
  const { districts, facilityTypes, ownershipTypes, currentStatus } = state;
  return {
    districtsList: districts.results,
    ownershipTypesList: ownershipTypes.results,
    facilityTypesList: facilityTypes.results,
    currentStatus: currentStatus.results,
  };
};


export default connect(mapStateToProps, null)(FacilityDetails);
