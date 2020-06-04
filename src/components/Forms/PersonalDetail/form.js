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
import { GENDER_MAPPING_PROPS } from 'Constants/app.const.js';
import { TOTAL_PERSONEL_DETAILS_FIELDS } from 'Src/constants';
import { SingleSelectChipsInput } from 'Components/Inputs';

// Importing mock data
import { patient_status_choices } from 'Mockdata/PatientStatusChoices.json';

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
    handleSave,
    setFieldTouched,
    setFieldValue,
    editMode,
    saveProfile,
    facilityList,
    clusterGroup,
    handleError,
    handleSubmit,
  } = props;

  const [values, setValues] = React.useState({
    facilityExists: Boolean(facility),
  })

  const setIsolationFacility = (event) => {
    if (event.target.name === 'facilityExists') {
      if (saveProfile) {
        saveProfile("facilityExists", event.target.checked);
        if(event.target.checked) {
          saveProfile("patient_status", 4);
        }
      }
      setFieldValue('homeIsolationExist', '');
      setValues({
        [event.target.name]: event.target.checked
      });
    }
  };
  const change = (event) => {
    const { name, value } = event.target;
    setFieldValue(name, value);
    if (saveProfile) {
      saveProfile(name, value)
    }
    setFieldTouched(name, true, false);
    if (value) {
      setFieldTouched(event.target.name, false, true);
    }
    let error = false;
    if (saveProfile) {
      if (value === "") {
        error = true;
      } else if (Object.keys(touched).length >= TOTAL_PERSONEL_DETAILS_FIELDS) {
        Object.entries(touched).forEach(([item, itemValue]) => {
          if (itemValue === true) {
            error = true;
            return;
          }
        })
      }
      if (handleError) {
        handleError(error);
      }
    }
  };

  const setProfileFields = (name, value) => {
    const genderId = GENDER_MAPPING_PROPS[value];
    if (saveProfile) {
      saveProfile(name, genderId);
    }
    setFieldTouched(name, true, false);
    if (value) {
      setFieldTouched(name, false, true);
    }
  }

  const setStatus = (name, val) => {
    console.log(name, val, "-----------")
    setFieldValue(name, val);
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
                defaultImage={gender === 'Male' ? patientMale : patientFemale}
                imageSrc={imageSrc}
                handleChange={(file, image) => setProfileImage(file, image)}
              />
            </Grid>
            <Grid item xs={12} sm={10}>
              <Grid item container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    name="name"
                    label={i18n.t('Patient name')}
                    fullWidth
                    value={name}
                    onChange={change}
                    helperText={touched.name ? errors.name : ""}
                    error={touched.name && Boolean(errors.name)}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ButtonToggle restrictUnselect={true} defaultSelected={gender} data={genderChoices} onChange={(data) => setProfileFields("gender", data)} />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <TextField
                    name="year"
                    label={i18n.t('Age in years')}
                    value={year}
                    onChange={change}
                    helperText={touched.year ? errors.year : ""}
                    error={touched.year && Boolean(errors.year)}
                    fullWidth
                    type="number"
                    required
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <TextField
                    name="month"
                    label={i18n.t('Age in Months')}
                    value={month}
                    onChange={change}
                    helperText={touched.month ? errors.month : ""}
                    error={touched.month && Boolean(errors.month)}
                    fullWidth
                    type="number"
                    required
                  />
                </Grid>
                <Grid item xs={6} sm={6}>
                  <TextField
                    name="icmr_id"
                    label={i18n.t('ICMR ID')}
                    value={icmr_id}
                    onChange={change}
                    helperText={touched.icmr_id ? errors.icmr_id : ""}
                    error={touched.icmr_id && Boolean(errors.icmr_id)}
                    type="number"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6} sm={6}>
                  <TextField
                    name="govt_id"
                    label={i18n.t('Govt ID')}
                    value={govt_id}
                    onChange={change}
                    helperText={touched.govt_id ? errors.govt_id : ""}
                    error={touched.govt_id && Boolean(errors.govt_id)}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
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
                { !Boolean(values.facilityExists) &&
                  <Grid className="pb-0 mb-10" item xs={12}>
                    <Typography variant="h6">
                      {i18n.t('Patient status')}
                    </Typography>
                    <SingleSelectChipsInput
                      value={patient_status}
                      options={patient_status_choices}
                      onChange={(val) => setStatus('patient_status', val)}
                      valueKey="id"
                      unselectable={true}
                    />
                    <h5 className="text--error">
                      {errors.patient_status}
                    </h5>
                  </Grid>
                }

                <Grid container item xs={12}>
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
                          {i18n.t('Patient associated With facility')}
                        </Typography>
                      }
                    />
                  </Grid>
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
