import React from 'react';
import { useTranslation } from "react-i18next";
import {
  Card,
  Grid,
  CardContent,
  TextField,
  Button,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Typography,
} from '@material-ui/core';
import patientMale from 'Assets/images/patient-male.svg';
import patientFemale from 'Assets/images/patient-female.svg';
import { PropTypes } from 'prop-types';
import useStyles from './styles';
import ButtonToggle from 'Components/ButtonToggle';
import { genderChoices } from 'Constants/app.const';
import ProfileImageInput from '../../profileImageInput';
export default function Form(props) {
  const classes = useStyles();
  const { i18n } = useTranslation();
  const {
    values: {
      name,
      gender,
      icmr_id,
      govt_id,
      cluster_group,
      imageSrc,
      month,
      year,
      clinical_status,
      patient_status,
      covid_status,
      facility,
      home_isolation
    },
    errors,
    touched,
    handleSave,
    setFieldTouched,
    setFieldValue,
    editMode,
    saveProfile,
    clinicalStatus,
    covidStatus,
    currentStatus,
    facilityList,
    clusterGroup,
    handleError,
  } = props;

  const [values, setValues] = React.useState({
    facilityExists: Boolean(facility),
    homeIsolationExist: Boolean(home_isolation),
  })
  
  const setIsolationFacility = (event) => {
    if (event.target.name === 'facilityExists') {
      saveProfile("home_isolation", !event.target.checked)
      // saveProfile(event.target.name, event.target.checked)
      setFieldValue('homeIsolationExist', '');
      setValues({
        homeIsolationExist: false,
        [event.target.name]: event.target.checked
      });
    } else if (event.target.name === 'homeIsolationExist') {
      saveProfile("home_isolation", event.target.checked)
      saveProfile("facility", null)
      setFieldValue('facilityExists', '');
      setValues({
        [event.target.name]: event.target.checked,
        facilityExists: false
      });
    }
  };
  const change = (event) => {
    saveProfile(event.target.name, event.target.value)
    setFieldTouched(event.target.name, true, false);
    if(event.target.value){
      setFieldTouched(event.target.name, false, true);
    }
    if(Object.keys(touched).length >= 11){
      let error = false;
      Object.entries(touched).map(item => {
          if(item[1] === true || event.target.value === ""){
            error = true;
            return;
          }
      })
      handleError(error);
    }
  };

  const setProfileFields = (name, value) =>{
    let gender = 1
    if(value === "Male")
    {
      gender = 1
    } else if(value === "Female"){
      gender = 2
    }
    else{
      gender = 3
    }
    saveProfile(name, gender)
    setFieldTouched(name, true, false);
    if(value){
      setFieldTouched(name, false, true);
    }
  }
  const setProfileImage = (file, image) => {
    console.log(file, image)
    setFieldValue('image', file);
    setFieldValue('imageSrc', image);
  };
  return (
  <form >
    <Card className={classes.root} elevation={4}>
      <CardContent>
        <Grid container spacing={4}>
          <Grid item className="p-0 bg-gray text-center" xs={12} sm={2}>
            <ProfileImageInput
              altText={i18n.t('Click to change photo')}
              defaultImage={gender === 'Male' ? patientMale: patientFemale}
              imageSrc={imageSrc}
              handleChange={(file, image) => setProfileImage(file, image)}
            />
          </Grid>
          <Grid item xs={12} sm={10}>
            <Grid item container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="name"
                  label={i18n.t('Name')}
                  fullWidth
                  value={name}
                  onChange={change}
                  helperText={touched.name ? errors.name : ""}
                  error={touched.name && Boolean(errors.name)}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <ButtonToggle restrictUnselect={true} defaultSelected={gender} data={genderChoices} onChange={(data) => setProfileFields("gender", data)} />
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField
                  name="year"
                  label={i18n.t('Years')}
                  value={year}
                  onChange={change}
                  helperText={touched.year ? errors.year : ""}
                  error={touched.year && Boolean(errors.year)}
                  fullWidth
                  type="number"
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField
                  name="month"
                  label={i18n.t('Months')}
                  value={month}
                  onChange={change}
                  helperText={touched.month ? errors.month : ""}
                  error={touched.month && Boolean(errors.month)}
                  fullWidth
                  type="number"
                />
              </Grid>
              <Grid item xs={6} sm={4}>
                <TextField
                  name="icmr_id"
                  label={i18n.t('ICMR ID')}
                  value={icmr_id}
                  onChange={change}
                  helperText={touched.icmr_id ? errors.icmr_id : ""}
                  error={touched.icmr_id && Boolean(errors.icmr_id)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6} sm={4}>
                <TextField
                  name="govt_id"
                  label={i18n.t('Govt ID')}
                  value={govt_id}
                  onChange={change}
                  helperText={touched.govt_id ? errors.govt_id : ""}
                  error={touched.govt_id && Boolean(errors.govt_id)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
            <TextField
              select
              name="clinical_status"
              label={i18n.t('Clinical status of patient')}
              value={clinical_status}
              onChange={change}
              helperText={touched.clinical_status ? errors.clinical_status : ""}
              error={touched.clinical_status && Boolean(errors.clinical_status)}
              fullWidth
            >
              {clinicalStatus &&
                clinicalStatus.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>))
                }
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              name="covid_status"
              label={i18n.t('Covid status of patient')}
              value={covid_status}
              onChange={change}
              helperText={touched.covid_status ? errors.covid_status : ""}
              error={touched.covid_status && Boolean(errors.covid_status)}
              fullWidth
            >
              {covidStatus &&
                covidStatus.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>))
              }
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              name="patient_status"
              label={i18n.t('status of patient')}
              value={patient_status}
              onChange={change}
              helperText={touched.patient_status ? errors.patient_status : ""}
              error={touched.patient_status && Boolean(errors.patient_status)}
              fullWidth
            >
              { currentStatus &&
                currentStatus.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>))
                }
            </TextField>
          </Grid>
              <Grid item xs={12} sm={4}>
            <TextField
              select
              name="cluster_group"
              label={i18n.t('cluster group of patient')}
              value={cluster_group}
              onChange={change}
              helperText={touched.cluster_group ? errors.cluster_group : ""}
              error={touched.cluster_group && Boolean(errors.cluster_group)}
              fullWidth
            >
              { clusterGroup &&
                clusterGroup.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>))
                }
            </TextField>
          </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel className={classes.checkboxWrap}
                control={
                <Checkbox
                  checked={values.facilityExists}
                  onChange={setIsolationFacility}
                  name="facilityExists"
                  color="primary"
                />
                }
                label={
                  <Typography variant="h5">
                    {i18n.t('facility associated with patient?')}
                  </Typography>
                }
              />
            </Grid>
             <Grid item xs={12} sm={6}>
              <FormControlLabel className={classes.checkboxWrap}
                control={
                <Checkbox
                  checked={values.homeIsolationExist}
                  onChange={setIsolationFacility}
                  name="homeIsolationExist"
                  color="primary"
                />
                }
                label={
                  <Typography variant="h5">
                    {i18n.t('Home Isolation?')}
                  </Typography>
                }
              />
            </Grid>
            {
              Boolean(values.facilityExists) &&
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  name="facility"
                  label={i18n.t('facility name')}
                  value={facility}
                  onChange={change}
                  helperText={touched.facility ? errors.facility : ""}
                  error={touched.facility && Boolean(errors.facility)}
                  fullWidth
                >
                  { facilityList &&
                    facilityList.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>))
                  }
                </TextField>
              </Grid>
            }
              { props.save === true &&
              <Grid item xs={6} sm={4}>
                <TextField
                  name="flag"
                  label={i18n.t('Cluster group')}
                  value={cluster_group}
                  onChange={change}
                  helperText={touched.clusterGroup ? errors.clusterGroup : ""}
                  error={touched.clusterGroup && Boolean(errors.clusterGroup)}
                  fullWidth
                />
              </Grid>
               }
              {
                editMode && 
                <Grid item xs={12} sm={3} className="ml-auto">
                  <Button
                    fullWidth
                    type="button"
                    onclick={handleSave}
                    variant="contained"
                    color="primary"
                    disableElevation
                    className="btn py-5"
                  >
                    {i18n.t('Save')}
                  </Button>
                </Grid>
              }
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
      <span></span>
    </Card>
  </form>
  );
}

Form.propTypes = {
  profile: PropTypes.object.isRequired,
  handleEdit: PropTypes.func
}

Form.defaultProps = {
  profile: {}
}
