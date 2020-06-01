import React, { Component } from 'react';
import i18n from "i18next";
import PersonalDetail from 'Components/Cards/PersonalDetail';
import PersonalDetailForm from 'Components/Forms/PersonalDetail';
// import t from 'typy';

import ContactDetail from 'Components/Cards/ContactDetail';
import Timeline from 'Components/Cards/Timeline';
import ContactDetailForm from 'Components/Forms/ContactDetail';
import MedicationDetail from 'Components/Cards/MedicationDetail';
import LabTestDetail from '../components/Cards/LabTestDetail';
import PortieDetails from '../components/Cards/PortieDetails';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
// Importing mock data: Please remove upon integration
import { patientDetail } from 'Mockdata/patientDetail.json';
import { fetchPatient, updatePatientDetails } from 'Actions/PatientsAction';
import _ from "underscore";
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
        'portieDetails',
        'familyDetails',
      ],
      isEditing: {
        personal: false,
        contact: false,
        medication: false,
        facility: false,
        labTests: false,
        portieDetails: false,
        familyDetails: false,
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
    const patientId = this.props.match.params.patientId;
    this.props.fetchPatient(patientId);
  }
  onSubmit = (data, key) => {
    if(key === "personal") {
      this.props.updatePatientDetails(data);
    }
    if(key === "contact") {
      this.props.updatePatientDetails(data);
    }
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
    if(!_.isEmpty(this.props.patient)){
    return (
      <>
        <h2 className="page-header header-container">{i18n.t('Patient Detail')}</h2>
        <div className="page-container">
          {
            isEditing[formList[0]] ? 
            <PersonalDetailForm
              profile={this.props.patient.personal_details[0]}
              handleSubmit={ (data) => this.onSubmit(data, formList[0]) }
              editMode={true}
              medicationDetails={this.props.patient.medication_details[0]}
            /> :
            <PersonalDetail
              profile={this.props.patient.personal_details[0]}
              medicationDetails={this.props.patient.medication_details[0]}
              handleEdit={ () => this.setEditable(formList[0], true) }
            />
          }
          {
            isEditing[formList[1]] ?
            <ContactDetailForm
              profile={this.props.patient.contact_details}
              handleSubmit={ (data) => {this.onSubmit(data, formList[1])} }
              editMode={true}
            /> :
            <ContactDetail
              profile={this.props.patient.contact_details}
              handleEdit={ () => this.setEditable(formList[1], true) }
            />
          }
          <Timeline />
          {
            isEditing[formList[2]] ?
            // <ContactDetailForm
            //   profile={profile.contact}
            //   handleSubmit={ (data) => {this.onSubmit(data, formList[1])} }
            //   editMode={true}
            // />
            <h2>I'm being edited</h2>
            :
            <MedicationDetail
              profile={profile[formList[2]]}
              handleEdit={ () => this.setEditable(formList[2], true) }
            />
          }
          {
            isEditing[formList[4]] ?
            // <ContactDetailForm
            //   profile={profile.contact}
            //   handleSubmit={ (data) => {this.onSubmit(data, formList[1])} }
            //   editMode={true}
            // />
            <h2>I'm being edited</h2>
            :
            <LabTestDetail
              profile={profile[formList[4]]}
              handleEdit={ () => this.setEditable(formList[4], true) }
            />
          }
          {
            isEditing[formList[5]] ?
            // <ContactDetailForm
            //   profile={profile.contact}
            //   handleSubmit={ (data) => {this.onSubmit(data, formList[1])} }
            //   editMode={true}
            // />
            <h2>I'm being edited</h2>
            :
            <PortieDetails
              profile={profile[formList[5]]}
              handleEdit={ () => this.setEditable(formList[5], true) }
            />
          }
        </div>
      </>
    );
  } else{
    return(
       <div>
      loader
      </div>
    )
  }
}
}


const mapStateToProps = state => {
    const { patient } = state;
    return {
        patient: patient,
    };
};


PatientDetail.propTypes = {
  patient: PropTypes.object.isRequired,
  fetchPatient: PropTypes.func.isRequired,
  updatePatientDetails :PropTypes.func.isRequired
};

export default connect(mapStateToProps, { fetchPatient, updatePatientDetails })(PatientDetail);
