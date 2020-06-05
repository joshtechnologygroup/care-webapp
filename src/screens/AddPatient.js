import React, { useState } from 'react';
import i18n from "i18next";
import {Grid, Snackbar} from "@material-ui/core";
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
import { TOTAL_PROFILE_FIELDS, TOTAL_FACILITY_FIELDS, FACILITY_EXISTS_ID } from 'Src/constants';
import _ from 'underscore';
function AddPatient(props) {
  const [formList, setFormList] = useState(['personal','contact', 'medication', 'facility', 'labTests', 'portieDetails', 'family',])
  const [profile, setProfile] = useState({year:1,month:1});
  let history = useHistory();
  const [formA, setFormA] = useState({});
  const [formB, setFormB] = useState({});
  const [formC, setFormC] = useState({});
  const [formD, setFormD] = useState({});
  // const [patient, setPatient] = useState({
  //   personal: {},
  //   contact:  {},
  //   medication: {
  //     clinicalStatus: '',
  //     covidStatus: '',
  //     symptoms: [],
  //     nonCovidDiseases: [],
  //     attendant: [],
  //   },
  //   facility_details: [],
  //   patient_lab_details: [],
  //   portie_calling_details: [],
  //   patient_family_details: [],
  // });
  const [labDetails, setLabDetails] = useState({});
  const [facilityDetails, setFacilityDetails] = useState({});
  const [submit, setSubmit] = useState(false);
  const [error, setError] = useState(null);
  const [fieldErrorDict, setFieldErrorDict] = useState({});
  const [formError, setFormError] = useState(false);
  const [open, setOpen] = useState(false);
  
  const saveLabDetails = (name, value) =>{
    setLabDetails(prevState => ({
      ...prevState,
      [name]:value
   }));
   if(value === ""){
     setFormError(true)
   }
  }

  const saveFacilityDetails = (name, value) =>{
    setFacilityDetails(prevState => ({
      ...prevState,
      [name]:value
   }));
  }

  const saveProfile = (name, value) =>{
    setProfile(prevState => ({
      ...prevState,
      [name]:value
   }));
   if(value === "") {
     setFormError(true);
   }
   setFieldErrorDict()
  }

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  
  const handleError = (value) =>{
    setFormError(value)
  }

  const handleSave = async () => { //calling save profile api
    let flag = true;
    let a = await formA;
    let b = await formB;
    let c = await formC;
    let d = await formD;
    let e = {...a,...b,...c,...d};
    Object.keys(e).forEach((key, value) =>{
      if(profile[key] || facilityDetails[key]) {
        e[key] = "";
      } else {
        flag = false;
      }
    });
    setFieldErrorDict(e);
    if(flag === true) {
      let initial_profile = {...profile};
    let patient_facility = {...facilityDetails};
    if(!patient_facility['admitted_at']) {
      patient_facility['admitted_at'] =  new Date()
    }
    if(!patient_facility['discharged_at']) {
      patient_facility['discharged_at'] =  new Date()
    }
    const response = await props.createPatient(profile);
      if(response.status) {
        setOpen(true);
        setError(true);
        history.push(`/patients/${response.patientId}`);
      } else{
        setOpen(true);
        setFormError(response.error);
      }
    } else {
      setOpen(true);
      setFormError("please fill the required details");
    }
    // setOpen(true);
    // setFormError("please fill either facility details or select patient status");
    // return;
    // setFieldErrorDict({
    //   ...a,...b,...c,
    // });
    // console.log(fieldErrorDict)
    // console.log(a,b,c, profile, formA)

  //   if(_.isEmpty(a) && _.isEmpty(b) && _.isEmpty(c) && _.isEmpty(d)) {
  //   let initial_profile = {...profile};
  //   let patient_facility = {...facilityDetails};
  //   if(!patient_facility['admitted_at']) {
  //     patient_facility['admitted_at'] =  new Date()
  //   }
  //   if(!patient_facility['discharged_at']) {
  //     patient_facility['discharged_at'] =  new Date()
  //   }
  //   let totalFields = Object.keys(initial_profile).length;
  //   if(initial_profile['native_state']) {
  //     totalFields = totalFields - 1;
  //   }
  //   if(initial_profile['native_country']) {
  //     totalFields = totalFields - 1;
  //   }
  //   if(initial_profile['patient_status'] === FACILITY_EXISTS_ID && _.isEmpty(patient_facility)) {
  //     setOpen(true);
  //     setFormError("please fill either facility details or select patient status");
  //     return;
  //   }
  //   if(TOTAL_PROFILE_FIELDS > totalFields) {
  //     setOpen(true);
  //     setFormError("please fill required details before submitting the form");
  //     return;
  //   }
  //   if(initial_profile['patient_status'] === FACILITY_EXISTS_ID && !_.isEmpty(patient_facility)){
  //     initial_profile['patient_facility'] = patient_facility;
  //   }
  //   let totalPatientFacilityFields = Object.keys(patient_facility).length;
  //   if(!_.isEmpty(patient_facility) && totalPatientFacilityFields !== TOTAL_FACILITY_FIELDS && initial_profile['patient_status'] === FACILITY_EXISTS_ID) {
  //     setOpen(true);
  //     setFormError("please fill all the facilties details");
  //     return;
  //   }
  //   if(formError) {
  //     setOpen(true);
  //     setFormError("please fill required details before submitting the form");
  //     return;
  //   }
  //     const response = await props.createPatient(profile);
  //     if(response.status) {
  //       setOpen(true);
  //       setError(true);
  //       history.push(`/patients/${response.patientId}`);
  //     } else{
  //       setOpen(true);
  //       setFormError(response.error);
  //     }
  //   } else {
  //     setOpen(true);
  //     setFormError("please fill the required details");
  //   }
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setFormError(false);
    setOpen(false);
    setError(null);
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
            handleError={handleError}
            setFormA={setFormA}
          />
           <ContactDetailForm
            profile={profile}
            fieldErrorDict={fieldErrorDict}
            saveProfile={saveProfile}
            handleSave={handleSave}
            handleError={handleError}
            setFormC={setFormC}
          />
           {console.log(fieldErrorDict)}
          <MedicationDetails
            editMode={true}
            fieldErrorDict={fieldErrorDict}
            saveProfile={saveProfile}
            profile={profile[formList[2]]}
            setFormD={setFormD}
          />
          {console.log(fieldErrorDict)}
          <FacilityDetails
            editMode={true}
            profile={profile[formList[3]]}
            fieldErrorDict={fieldErrorDict}
            saveFacilityDetails={saveFacilityDetails}
            setFormB={setFormB}
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
        
        <Snackbar
          open={open}
          autoHideDuration={5000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity={error==true ? "success":"error"}>
          {error &&
            <div>
              {error===true && "Successfully created!"}
              {error===false && "Error occured!"}
            </div>
          }
          {formError && error === null && <div>{formError}</div>}
          </Alert>
        </Snackbar>
      </>
    );
}


const mapStateToProps = state => {
};

AddPatient.propTypes = {
  createPatient: PropTypes.func.isRequired,
  createPatientSampleTest: PropTypes.func.isRequired
};


export default connect(mapStateToProps, {createPatient, createPatientSampleTest})(AddPatient);
