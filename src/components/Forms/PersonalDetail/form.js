import React, { useEffect } from 'react';
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
import { GENDER_MAPPING_PROPS } from 'Constants/app.const.js';
import { SingleSelectChipsInput } from 'Components/Inputs';

import { patient_status_choices, FACILITY_EXISTS } from 'Constants/app.const';

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
      patient_status,
      imageSrc,
      month,
      year,
      facility,
    },
    errors,
    touched,
    setFieldTouched,
    setFieldValue,
    editMode,
    saveProfile,
    clusterGroup,
    handleSubmit,
    validateForm,
    fieldErrorDict,
    setPersonalForm,
  } = props;

  useEffect(() => {
    if(setPersonalForm) {
      setPersonalForm(validateForm);
    }
  }, []);

  const [values, setValues] = React.useState({
    facilityExists: Boolean(facility),
  })

  const change = (event) => {
    const { name, value } = event.target;
    setFieldTouched(name, true, false);
    if (value) {
      setFieldTouched(name, false, true);
    }
    setFieldValue(name, value);
    if (saveProfile) {
      saveProfile(name, value);
    }
  };

  const setProfileFields = (name, value) => {
    setFieldValue(name, value);
    if (saveProfile) {
      saveProfile(name, value);
    }
  }

  const setStatus = (name, val) => {
    if(val){
    setFieldValue(name, val);
    } else {
      setFieldValue(name, FACILITY_EXISTS);
    }
    if (saveProfile) {
      saveProfile(name, val)
    }
  }

  const setProfileImage = (file, image) => {
    setFieldValue('image', file);
    setFieldValue('imageSrc', image);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="section-header mt-0">
        <h4 className="heading--card">{i18n.t('Personal Details')}</h4>
      </div>

      <Card className={classes.root} elevation={4}>
        <CardContent>
          <Grid container spacing={4}>
            <Grid item className="p-0 bg-gray text-center" xs={12} sm={2}>
              <ProfileImageInput
                altText={i18n.t('Click to change photo')}
                defaultImage={(gender === GENDER_MAPPING_PROPS['Male'] || !gender) ? patientMale : patientFemale}
                imageSrc={imageSrc}
                handleChange={(file, image) => setProfileImage(file, image)}
              />
            </Grid>
            <Grid item xs={12} sm={10}>
              <Grid item container spacing={2}>
                <Grid item xs={12} sm={8}>
                  <TextField
                    name="name"
                    label={i18n.t('Patient name')}
                    fullWidth
                    value={name}
                    onChange={change}
                    helperText={touched.name && Boolean(errors.name) || (fieldErrorDict ? fieldErrorDict.name : "") && errors.name}
                    error={touched.name && Boolean(errors.name) || Boolean(fieldErrorDict ? fieldErrorDict.name : "") && Boolean(errors.name)}
                    required
                  />
                </Grid>
                <Grid item xs={6} sm={2}>
                  <TextField
                    name="year"
                    label={i18n.t('Age in years')}
                    value={year}
                    onChange={change}
                    helperText={touched.year ? errors.year : "" || (fieldErrorDict ? fieldErrorDict.year : "") && errors.year}
                    error={touched.year && Boolean(errors.year) || Boolean(fieldErrorDict ? fieldErrorDict.year : "") && Boolean(errors.year)}
                    fullWidth
                    type="number"
                    required
                  />
                </Grid>
                <Grid item xs={6} sm={2}>
                  <TextField
                    name="month"
                    label={i18n.t('Age in Months')}
                    value={month}
                    onChange={change}
                    helperText={touched.month ? errors.month : "" || (fieldErrorDict ? fieldErrorDict.month : "") && errors.month}
                    error={touched.month && Boolean(errors.month) || Boolean(fieldErrorDict ? fieldErrorDict.month : "") &&  Boolean(errors.month)}
                    fullWidth
                    type="number"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
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
                <Grid item xs={12} sm={4}>
                  <TextField
                    name="govt_id"
                    label={i18n.t('Govt ID')}
                    value={govt_id}
                    onChange={change}
                    helperText={touched.govt_id && Boolean(errors.govt_id) || (fieldErrorDict ? fieldErrorDict.govt_id : "") && errors.govt_id}
                    error={touched.govt_id && Boolean(errors.govt_id) || Boolean(fieldErrorDict ? fieldErrorDict.govt_id : "") && Boolean(errors.govt_id)}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    select
                    name="cluster_group"
                    label={i18n.t('Cluster group of patient')}
                    value={cluster_group}
                    onChange={change}
                    helperText={touched.cluster_group ? errors.cluster_group : ""}
                    error={touched.cluster_group && Boolean(errors.cluster_group)}
                    fullWidth
                  >
                    {clusterGroup &&
                      clusterGroup.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.name}
                        </MenuItem>))
                    }
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6">{i18n.t('Gender')}</Typography>
                  <SingleSelectChipsInput
                    value={gender}
                    options={genderChoices}
                    onChange={(data) => setProfileFields("gender", data)}
                    valueKey="id"
                  />
                  <h5 className="text--error">{Boolean(touched.gender) && errors.gender || (fieldErrorDict ? fieldErrorDict.gender : "") && errors.gender}</h5>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6">{i18n.t('Patient status')}</Typography>
                  <SingleSelectChipsInput
                    value={patient_status}
                    options={patient_status_choices}
                    onChange={(val) => setStatus('patient_status', val)}
                    valueKey="id"
                    unselectable={true}
                  />
                  <h5 className="text--error">{errors.patient_status}</h5>
                </Grid>
                {
                  editMode &&
                  <Grid item xs={12} sm={3} className="ml-auto">
                    <Button
                      fullWidth
                      type="submit"
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
