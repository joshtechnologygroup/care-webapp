import React from 'react';
import { useTranslation } from "react-i18next";
import {
  Card,
  Grid,
  CardContent,
  TextField,
  Button,

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
      firstName,
      lastName,
      gender,
      idICMR,
      idGovt,
      clusterGroup,
      imageSrc,
      ageMonths,
      ageYears,
    },
    errors,
    touched,
    handleSubmit,
    handleChange,
    setFieldTouched,
    setFieldValue,
    editMode
  } = props;

  const change = (name, e) => {
    handleChange(e);
    setFieldTouched(e.target.name, true, false);
  };
  const setProfileImage = (file, image) => {
    setFieldValue('image', file);
    setFieldValue('imageSrc', image);
  };
  return (
  <form onSubmit={handleSubmit}>
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
              <Grid item xs={6}>
                <TextField
                  name="firstName"
                  label={i18n.t('First Name')}
                  fullWidth
                  value={firstName}
                  onChange={change.bind(null, 'firstName')}
                  helperText={touched.firstName ? errors.firstName : ""}
                  error={touched.firstName && Boolean(errors.firstName)}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  name="lastName"
                  label={i18n.t('Last Name')}
                  value={lastName}
                  onChange={change.bind(null, 'lastName')}
                  helperText={touched.lastName ? errors.lastName : ""}
                  error={touched.lastName && Boolean(errors.lastName)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <ButtonToggle restrictUnselect={true} defaultSelected={gender} data={genderChoices} onChange={(data) => setFieldValue("gender", data)} />
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField
                  name="ageYears"
                  label={i18n.t('Years')}
                  value={ageYears}
                  onChange={change.bind(null, 'ageYears')}
                  helperText={touched.ageYears ? errors.ageYears : ""}
                  error={touched.ageYears && Boolean(errors.ageYears)}
                  fullWidth
                  type="number"

                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField
                  name="ageMonths"
                  label={i18n.t('Months')}
                  value={ageMonths}
                  onChange={change.bind(null, 'ageMonths')}
                  helperText={touched.ageMonths ? errors.ageMonths : ""}
                  error={touched.ageMonths && Boolean(errors.ageMonths)}
                  fullWidth
                  type="number"
                />
              </Grid>
              <Grid item xs={6} sm={4}>
                <TextField
                  name="idICMR"
                  label={i18n.t('ICMR ID')}
                  value={idICMR}
                  onChange={change.bind(null, 'idICMR')}
                  helperText={touched.idICMR ? errors.idICMR : ""}
                  error={touched.idICMR && Boolean(errors.idICMR)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6} sm={4}>
                <TextField
                  name="idGovt"
                  label={i18n.t('Govt. ID')}
                  value={idGovt}
                  onChange={change.bind(null, 'idGovt')}
                  helperText={touched.idGovt ? errors.idGovt : ""}
                  error={touched.idGovt && Boolean(errors.idGovt)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6} sm={4}>
                <TextField
                  name="clusterGroup"
                  label={i18n.t('Cluster group')}
                  value={clusterGroup}
                  onChange={change.bind(null, 'clusterGroup')}
                  helperText={touched.clusterGroup ? errors.clusterGroup : ""}
                  error={touched.clusterGroup && Boolean(errors.clusterGroup)}
                  fullWidth
                />
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
                    className="btn py-8"
                  >
                    {i18n.t('Submit')}
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
