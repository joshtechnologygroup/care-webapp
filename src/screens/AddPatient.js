import React, { useState } from 'react';
import i18n from "i18next";
import { Grid } from "@material-ui/core";
import PersonalDetailForm from 'Components/Forms/PersonalDetail';
import ContactDetailForm from 'Components/Forms/ContactDetail';
import MedicationDetails from 'Containers/Patient/MedicationDetails';
import DoctorAttendant from 'Containers/Patient/DoctorAttendant';
import FacilityDetails from 'Containers/Patient/FacilityDetails';
import LabTestDetails from 'Containers/Patient/LabTestDetails';
import PortieDetails from 'Containers/Patient/PortieDetails';
import FamilyDetails from 'Containers/Patient/FamilyDetails';
import { useHistory } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from 'Containers/Header';
import { Button } from '@material-ui/core';
import { createPatient, createPatientSampleTest } from 'Actions/PatientsAction';
import MuiAlert from "@material-ui/lab/Alert";
import _ from 'underscore';
import { createToastNotification } from 'Actions/ToastAction';
import * as ToastUtils from 'Src/utils/toast';
import { SUCCESS, DANGER } from "Src/constants";
import { FACILITY_EXISTS, ADMITTED_TO_FACILITY } from 'Constants/app.const';

function AddPatient(props) {
  const [formList, setFormList] = useState(['personal', 'contact', 'medication', 'facility', 'labTests', 'portieDetails', 'family',])
  const [profile, setProfile] = useState({
    year: 1,
    month: 1,
    patient_symptoms: [],
    patient_diseases: [],
    state: 1,
  });
  let history = useHistory();
  const [personalForm, setPersonalForm] = useState({});
  const [contactForm, setContactForm] = useState({});
  const [patientFacilityForm, setPatientFacilityForm] = useState({});
  const [medicationForm, setMedicationForm] = useState({});
  const [labDetails, setLabDetails] = useState({});
  const [facilityDetails, setFacilityDetails] = useState({});
  const [fieldErrorDict, setFieldErrorDict] = useState({});

  const saveLabDetails = (name, value) => {
    setLabDetails(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const saveFacilityDetails = (name, value) => {
    setFacilityDetails(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const saveProfile = (name, value) => {
    if (value) {
      setProfile(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  }

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleSave = async () => { //calling save profile api
    let flag = true;
    let personalDetails = await personalForm;
    let contactDetails = await contactForm;
    let patientfacilitiesDetails = await patientFacilityForm;
    let medicationDetails = await medicationForm;
    let errors = { ...personalDetails, ...contactDetails, ...patientfacilitiesDetails, ...medicationDetails };
    Object.keys(errors).forEach((key, value) => {
      if (profile[key] || facilityDetails[key]) {
        errors[key] = null;
      } else {
        flag = false;
      }
    });
    const regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (profile['phone_number'] && !regex.test(profile['phone_number'])) {
      errors['phone_number'] = "please enter valid  phone number"
      flag = false;
    }
    const pat1 = /^\d{6}$/;
    if (profile['pincode'] && !pat1.test(profile['pincode'])) {
      errors['pincode'] = "please enter valid pincode"
      flag = false;
    }
    if (!profile['patient_status']) {
      profile['patient_status'] = FACILITY_EXISTS;
    }
    if (profile['patient_status'] === FACILITY_EXISTS && !facilityDetails['facility'] && !facilityDetails['patient_status']) {
      errors['facility'] = 'facility name is required';
      flag = false;
      errors['patient_status'] = 'Please select current status';
    }
    if (!_.isEmpty(facilityDetails) && facilityDetails['patient_status'] !== ADMITTED_TO_FACILITY && !facilityDetails['discharged_at']) {
      errors['discharged_at'] = 'please fill discharged date';
      flag = false;
    }

    setFieldErrorDict(errors);
    if (flag) {
      let initial_profile = { ...profile };
      delete initial_profile.icmr_id;
      let patient_facility = { ...facilityDetails };
      if (!patient_facility['admitted_at']) {
        patient_facility['admitted_at'] = new Date()
      }
      if (profile['patient_status'] === 4) {
        initial_profile['patient_facility'] = patient_facility;
      }
      const response = await props.createPatient(initial_profile);
      if (response.status) {
        props.createToastNotification(ToastUtils.toastDict((new Date()).getTime(), "Updated", "Successfully Updated ", SUCCESS))
        history.push(`/patients/${response.patientId}`);
      } else {
        props.createToastNotification(
          ToastUtils.toastDict((new Date()).getTime(), i18n.t("Error!"), response.error, DANGER))
      }
    }
  };

  return (
    <>
      <Header>
        <h2>{i18n.t('Add Patient')}</h2>
        <Button
          variant="contained"
          color="primary"
          disableElevation
          className="btn py-5 ml-auto"
          onClick={handleSave}
        >
          {i18n.t('Save')}
        </Button>
      </Header>
      <div className="page-container">
        <PersonalDetailForm
          profile={profile}
          saveProfile={saveProfile}
          handleSave={handleSave}
          fieldErrorDict={fieldErrorDict}
          setPersonalForm={setPersonalForm}
        />
        <FacilityDetails
          editMode={true}
          profile={profile}
          fieldErrorDict={fieldErrorDict}
          saveFacilityDetails={saveFacilityDetails}
          setPatientFacilityForm={setPatientFacilityForm}
        />
        <ContactDetailForm
          profile={profile}
          fieldErrorDict={fieldErrorDict}
          saveProfile={saveProfile}
          handleSave={handleSave}
          setContactForm={setContactForm}
        />
        <MedicationDetails
          editMode={true}
          fieldErrorDict={fieldErrorDict}
          saveProfile={saveProfile}
          profile={profile}
          setMedicationForm={setMedicationForm}
          showButtons={false}
        />
        {/* <DoctorAttendant
            profile={profile[formList[2]].attendant}
          /> */}
        {/* <LabTestDetails
            saveLabDetails={saveLabDetails}
            profile={profile[formList[4]]}
          />
          <PortieDetails
            profile={profile[formList[5]]}
          />
          <FamilyDetails
            profile={profile[formList[6]]}
          /> */}
        <Grid container justify="space-between">
          <h2>{i18n.t('*Required fields')}</h2>
          <Button
            variant="contained"
            color="primary"
            disableElevation
            className="btn py-5 ml-auto"
            onClick={handleSave}
          >
            {i18n.t('Save')}
          </Button>
        </Grid>
      </div>
    </>
  );
}


const mapStateToProps = state => {
};

AddPatient.propTypes = {
  createPatient: PropTypes.func.isRequired,
  createPatientSampleTest: PropTypes.func.isRequired,
  createToastNotification: PropTypes.func
};


export default connect(mapStateToProps, { createPatient, createPatientSampleTest, createToastNotification })(AddPatient);
