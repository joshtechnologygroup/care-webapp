import React, { useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { connect } from 'react-redux';
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
import { PropTypes } from 'prop-types';
import useStyles from './styles';
import { TOTAL_CONTACT_DETAILS_FIELDS } from 'Src/constants';

import { countryChoices, stateChoices, relationshipChoices } from 'Constants/app.const';

export function Form(props) {
  const classes = useStyles();
  const { i18n } = useTranslation();

  const {
    values: {
      phone_number,
      phone_number_belongs_to,
      address,
      district,
      state,
      pincode,
      native_state,
      native_country,
    },
    errors,
    touched,
    handleSubmit,
    setFieldValue,
    setFieldTouched,
    editMode,
    saveProfile,
    districts,
    states,
    handleError,
    setContactForm,
    validateForm,
    fieldErrorDict,
  } = props;

  useEffect(() => {
    if (setContactForm) {
      setContactForm(validateForm);
    }
  }, [])

  const [values, setValues] = React.useState({
    nativeCountryExist: Boolean(native_country),
    nativeStateExist: Boolean(native_state),
  })
  const setNativePlace = (event) => {
    const { name, value, checked } = event.target;
    if (name === 'nativeStateExist') {
      if (saveProfile) {
        saveProfile('native_state', value);
      }
      setFieldValue('native_state', value);
      setValues(prevState => ({
        ...prevState,
        [name]: checked
      }));
    } else if (name === 'nativeCountryExist') {
      if (saveProfile) {
        saveProfile('native_country', value);
      }
      setFieldValue('native_country', value);
      setValues(prevState => ({
        ...prevState,
        [name]: checked
      }))
    }
  };

  const handleChange = (event) => {
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

  return (
    <form onSubmit={handleSubmit}>
      <div className="section-header" onClick={handleSubmit}>
        <h4 className="heading--card">{i18n.t('Contact Details')}</h4>
      </div>
      <Card className={classes.root} elevation={4}>
        <CardContent>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="phone_number"
                type="number"
                label={i18n.t('Contact number')}
                required
                fullWidth
                value={phone_number}
                onChange={handleChange}
                helperText={touched.phone_number ? errors.phone_number : "" || (fieldErrorDict ? fieldErrorDict.phone_number : "") && errors.phone_number}
                error={touched.phone_number && Boolean(errors.phone_number) || (fieldErrorDict ? fieldErrorDict.phone_number : "") && errors.phone_number}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                select
                name="phone_number_belongs_to"
                label={i18n.t('Contact Number belongs to')}
                value={phone_number_belongs_to}
                onChange={handleChange}
                helperText={touched.phone_number_belongs_to ? errors.phone_number_belongs_to : "" || (fieldErrorDict ? fieldErrorDict.phone_number_belongs_to : "") && errors.phone_number_belongs_to}
                error={touched.phone_number_belongs_to && Boolean(errors.phone_number_belongs_to) || (fieldErrorDict ? fieldErrorDict.phone_number_belongs_to : "") && errors.phone_number_belongs_to}
                fullWidth
                required
              >
                {
                  relationshipChoices.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>))
                }
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                multiline
                name="address"
                label={i18n.t('Address')}
                value={address}
                onChange={handleChange}
                helperText={touched.address ? errors.address : ""}
                error={touched.address && Boolean(errors.address)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                name="district"
                label={i18n.t('District')}
                value={district}
                onChange={handleChange}
                helperText={touched.district ? errors.district : ""}
                error={touched.district && Boolean(errors.district)}
                fullWidth
              >
                {districts &&
                  districts.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>))
                }
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                name="state"
                label={i18n.t('State')}
                value={state}
                isDisabled={true}
                onChange={handleChange}
                helperText={touched.state ? errors.state : ""}
                error={touched.state && Boolean(errors.state)}
                fullWidth
              >
                {states &&
                  states.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>))
                }
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="pincode"
                label={i18n.t('Pincode')}
                value={pincode}
                onChange={handleChange}
                helperText={touched.pincode ? errors.pincode : ""}
                error={touched.pincode && Boolean(errors.pincode)}
                fullWidth
              />
            </Grid>
            <Grid container item xs={12}>
              <Grid item xs={12} sm={6}>
                <FormControlLabel className={classes.checkboxWrap}
                  control={
                    <Checkbox
                      checked={values.nativeStateExist}
                      onChange={setNativePlace}
                      name="nativeStateExist"
                      color="primary"
                    />
                  }
                  label={
                    <Typography variant="h5">
                      {i18n.t('Patient natively belongs to some other Indian state')}
                    </Typography>
                  }
                />
              </Grid>
              {
                Boolean(values.nativeStateExist) &&
                <Grid item xs={12} sm={6}>
                  <TextField
                    select
                    name="native_state"
                    label={i18n.t('Native state of patient')}
                    value={native_state}
                    onChange={handleChange}
                    helperText={touched.native_state ? errors.native_state : ""}
                    fullWidth>
                    {states &&
                      states.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.name}
                        </MenuItem>))
                    }
                  </TextField>
                </Grid>
              }
            </Grid>
            <Grid container item xs={12}>
              <Grid item xs={12} sm={6}>
                <FormControlLabel className={classes.checkboxWrap}
                  control={
                    <Checkbox
                      checked={values.nativeCountryExist}
                      onChange={setNativePlace}
                      name="nativeCountryExist"
                      color="primary"
                    />
                  }
                  label={
                    <Typography variant="h5">
                      {i18n.t('Patient natively belongs to a foreign country')}
                    </Typography>
                  }
                />
              </Grid>
              {
                Boolean(values.nativeCountryExist) &&
                <Grid item xs={12} sm={6}>
                  <TextField
                    multiline
                    name="native_country"
                    label={i18n.t('Native country of patient')}
                    value={native_country}
                    onChange={handleChange}
                    helperText={touched.native_country ? errors.address : ""}
                    fullWidth
                  />
                </Grid>
              }
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
        </CardContent>
        <span></span>
      </Card>
    </form>
  );
}


Form.defaultProps = {
  profile: {}
}

Form.propTypes = {
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps, null)(Form);
