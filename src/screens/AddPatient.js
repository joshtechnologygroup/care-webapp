import React, { useState } from 'react';
import i18n from "i18next";
import {Grid, Snackbar} from "@material-ui/core";
import PersonalDetailForm from 'Components/Forms/PersonalDetail';
import ContactDetailForm from 'Components/Forms/ContactDetail';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from 'Containers/Header';
import { Button } from '@material-ui/core';
import { createPatient } from 'Actions/PatientsAction';
import MuiAlert from "@material-ui/lab/Alert";
import { TOTAL_PROFILE_FIELDS } from 'Src/constants';

function AddPatient(props) {
  const [formList, setFormList] = useState(['personal','contact',])
  const [profile, setProfile] = useState({})
  const [error, setError] = useState(null)
  const [formError, setFormError] = useState(false);
  const [open, setOpen] = useState(false)

  const saveProfile = (name, value) =>{
    setProfile(prevState => ({
      ...prevState,
      [name]:value
   }));
   if(value === ""){
     setFormError(true)
   }
  }
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  
  const handleError = (value) =>{
    setFormError(value)
  }

  const handleSave = async () => { //calling save profile api
    let totalFields = Object.keys(profile).length
    if(profile['native_state']){
      totalFields = totalFields - 1;
    }
    if(profile['native_country'])
    {
      totalFields = totalFields - 1;
    }
    if(profile['municipalWard']){
      totalFields = totalFields - 1;
    }
    if((profile['home_isolation'] === false && profile['facility'] === null) || totalFields !== TOTAL_PROFILE_FIELDS){
      setOpen(true);
      setFormError(true);
      return;
    }
    if(formError === true){
      setOpen(true);
      return;
    }
    if(totalFields === TOTAL_PROFILE_FIELDS){
      const response = await props.createPatient(profile)
    if(response === true){
      setError(true)
    } else {
      setError(false)
    }
    setOpen(true)
    }else{
      setOpen(true);
      setFormError(true);
    }
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
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
            handleError={handleError}
          />
          <ContactDetailForm
            profile={profile}
            saveProfile={saveProfile}
            handleSave={handleSave}
            handleError={handleError}
          />
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
                  {error === null && <div>Please fill all the fields first!</div>}
                </Alert>
              </Snackbar>
      </>
    );
}


const mapStateToProps = state => {
};

AddPatient.propTypes = {
  createPatient: PropTypes.func.isRequired,
};


export default connect(mapStateToProps, {createPatient})(AddPatient);
