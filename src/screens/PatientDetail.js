import React, { Component } from 'react';
import i18n from "i18next";
import PersonalDetail from 'Components/Cards/PersonalDetail';
import PersonalDetailForm from 'Components/Forms/PersonalDetail';
import ContactDetail from 'Components/Cards/ContactDetail';
import Timeline from 'Components/Cards/Timeline';
import ContactDetailForm from 'Components/Forms/ContactDetail';
import MedicationDetail from 'Containers/Patient/MedicationDetail';
import MedicationDetailForm  from 'Containers/Patient/MedicationDetail/MedicationDetailForm';
import LabTestDetail from '../components/Cards/LabTestDetail';
import FacilityDetails from '../components/Cards/FacilityDetails';

// Final
import PortieDetails from 'Containers/Patient/PortieDetails';
import FamilyDetails from 'Containers/Patient/FamilyDetails';

import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

// Importing mock data: Please remove upon integration
import { patientDetail } from 'Mockdata/patientDetail.json';
import { fetchPatient } from 'Actions/PatientsAction';
class PatientDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formList: [
        'personal',
        'contact',
        'medication',
        'facility',
        'labTests',
        'portie_calling_details',
        'patient_family_details',
      ],
      isEditing: {
        personal: false,
        contact: false,
        medication: false,
        facility: false,
        labTests: false,
        portie_calling_details: false,
        patient_family_details: false,
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
  componentDidMount(){
    this.props.fetchPatient(1);
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
      <>
        <h2 className="page-header header-container">{i18n.t('Patient Detail')}</h2>
        <div className="page-container">
          {
            isEditing[formList[0]] ? 
            <PersonalDetailForm
              profile={profile[formList[0]]}
              handleSubmit={ (data) => this.onSubmit(data, formList[0]) }
              editMode={true}
            /> :
            <PersonalDetail
              profile={profile[formList[0]]}
              handleEdit={ () => this.setEditable(formList[0], true) }
            />
          }
          {
            isEditing[formList[1]] ?
            <ContactDetailForm
              profile={profile[formList[1]]}
              handleSubmit={ (data) => {this.onSubmit(data, formList[1])} }
              editMode={true}
            /> :
            <ContactDetail
              profile={profile[formList[1]]}
              handleEdit={ () => this.setEditable(formList[1], true) }
            />
          }
          <Timeline />
          {
            isEditing[formList[2]] ?
            <MedicationDetailForm
              profile={profile[formList[2]]}
              handleSubmit={ (data) => {this.onSubmit(data, formList[2])} }
              editMode={true}
            />
            :
            <MedicationDetail
              profile={profile[formList[2]]}
              handleEdit={ () => this.setEditable(formList[2], true) }
            />
          }
          <FacilityDetails
            profile={profile[formList[3]]}
          />
          <LabTestDetail
            profile={profile[formList[4]]}
          />
          <PortieDetails
            profile={profile[formList[5]]}
          />
          <FamilyDetails
            profile={profile[formList[6]]}
          />
        </div>
      </>
    );
  }
}


const mapStateToProps = state => {
    const { patient } = state;
    return {
        patient: patient.results,
    };
};


PatientDetail.propTypes = {
  patient: PropTypes.array.isRequired,
  fetchPatient: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { fetchPatient })(PatientDetail);
