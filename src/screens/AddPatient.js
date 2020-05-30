import React, { useState, useEffect } from 'react';
import i18n from "i18next";

import PersonalDetailForm from 'Components/Forms/PersonalDetail';
import ContactDetailForm from 'Components/Forms/ContactDetail';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from 'Containers/Header';
import { Button } from '@material-ui/core';
import { createPatient } from 'Actions/PatientsAction';
function AddPatient(props) {
  const [formList, setFormList] = useState(['personal','contact',])
  const [profile, setProfile] = useState({})
  const [error, setError] = useState(false)
  const [formError, setFormError] = useState(false)

  // useEffect(() => {
  // console.log("ayushhhhhhhhh")
  // }, [formError]);

  const saveProfile = (name, value) =>{
    console.log("save profile",name,value)
    setProfile(prevState => ({
      ...prevState,
      [name]:value
   }));
  }

  const handleError = (value) =>{
    console.log("ayushhhhh", value)
    setFormError(value)
  }

  const handleSave = async () => { //calling save profile api
    console.log(profile)
    let totalFields = Object.keys(profile).length
    console.log(totalFields)
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
    if((profile['home_isolation'] === false && profile['facility'] === null) || totalFields !== 18){
      setFormError(true);
      return;
    }
    if(totalFields === 18){
      const response = await props.createPatient(profile)
    if(response.status === true){
      setError(true)
      alert("created")
    } else {
      setError(false)
      alert("not created")
    }
    }
    
    const status = await props.createPatient(profile)
    if(status === true){
      setError(true)
    } else {
      setError(false)
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
            disabled={formError}
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
        </div>
      </>
    );
}


const mapStateToProps = state => {
};

AddPatient.propTypes = {
  createPatient: PropTypes.func.isRequired,
};


export default connect(mapStateToProps, {createPatient})(AddPatient);
