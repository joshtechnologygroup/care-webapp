import React from 'react';
import { useTranslation } from "react-i18next";
import {
  Card,
  Grid,
  CardContent,
  TextField,
  Button,
  MenuItem,
  CardHeader,
  FormControlLabel,
  Checkbox,
  Typography,
} from '@material-ui/core';
import { PropTypes } from 'prop-types';
import useStyles from './styles';

// IMORTING MOCKDATA
import { countryChoices } from 'Mockdata/countryChoices.json';
import { stateChoices } from 'Mockdata/stateChoices.json';
import { relationshipChoices } from 'Mockdata/relationshipChoices.json';

export default function Form(props) {
  const classes = useStyles();
  const { i18n } = useTranslation();
  const {
    values: {
      number,
      numberBelongsTo,
      address,
      municipalWard,
      city,
      district,
      state,
      pincode,
      nativeState,
      nativeCountry,
    },
    errors,
    touched,
    handleSubmit,
    handleChange,
    setFieldValue,
    setFieldTouched,
    editMode,
  } = props;
  
  const change = (name, e) => {
    handleChange(e);
    setFieldTouched(e.target.name, true, false);
  };
  const [values, setValues] = React.useState({
    nativeCountryExist: Boolean(nativeCountry),
    nativeStateExist: Boolean(nativeState),
  })
  const setNativePlace = (event) => {
    if (event.target.name === 'nativeStateExist') {
      setFieldValue('nativeCountry', '');
      setValues({
        nativeCountryExist: false,
        [event.target.name]: event.target.checked
      });
    } else if (event.target.name === 'nativeCountryExist') {
      setFieldValue('nativeState', '');
      setValues({
        [event.target.name]: event.target.checked,
        nativeStateExist: false
      });
    }
  };
  
  return (
  <form onSubmit={handleSubmit}>
    <Card className={classes.root} elevation={4}>
      <CardHeader className="pb-0"
        title={i18n.t('Contact Details')}
      />
      <CardContent>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <TextField
              name="number"
              type="number"
              label={i18n.t('Phone number')}
              fullWidth
              value={number}
              onChange={change.bind(null, 'number')}
              helperText={touched.number ? errors.number : ""}
              error={touched.number && Boolean(errors.number)}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              select
              name="numberBelongsTo"
              label={i18n.t('Contact Number belongs to?')}
              value={numberBelongsTo}
              onChange={change.bind(null, 'numberBelongsTo')}
              helperText={touched.numberBelongsTo ? errors.numberBelongsTo : ""}
              error={touched.numberBelongsTo && Boolean(errors.numberBelongsTo)}
              fullWidth
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
              onChange={change.bind(null, 'address')}
              helperText={touched.address ? errors.address : ""}
              error={touched.address && Boolean(errors.address)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="municipalWard"
              label={i18n.t('Municipal Ward')}
              value={municipalWard}
              onChange={change.bind(null, 'municipalWard')}
              helperText={touched.municipalWard ? errors.municipalWard : ""}
              error={touched.municipalWard && Boolean(errors.municipalWard)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="city"
              label={i18n.t('City')}
              value={city}
              onChange={change.bind(null, 'city')}
              helperText={touched.city ? errors.city : ""}
              error={touched.city && Boolean(errors.city)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="district"
              label={i18n.t('District')}
              value={district}
              onChange={change.bind(null, 'district')}
              helperText={touched.district ? errors.district : ""}
              error={touched.district && Boolean(errors.district)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              name="state"
              label={i18n.t('State')}
              value={state}
              onChange={change.bind(null, 'state')}
              helperText={touched.state ? errors.state : ""}
              error={touched.state && Boolean(errors.state)}
              fullWidth
            >
              {
                stateChoices.map((option) => (
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
              onChange={change.bind(null, 'pincode')}
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
                    {i18n.t('Patient natively belongs to some other Indian state?')}
                  </Typography>
                }
              />
            </Grid>
            {
              Boolean(values.nativeStateExist) &&
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  name="nativeState"
                  label={i18n.t('Native State')}
                  value={nativeState}
                  onChange={change.bind(null, 'nativeState')}
                  helperText={touched.nativeState ? errors.nativeState : ""}
                  error={touched.nativeState && Boolean(errors.nativeState)}
                  fullWidth
                >
                  {
                    stateChoices.map((option) => (
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
                    {i18n.t('Patient natively belongs to a foreign country?')}
                  </Typography>
                }
              />
            </Grid>
            {
              Boolean(values.nativeCountryExist) &&
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  name="nativeCountry"
                  label={i18n.t('Native Country')}
                  value={nativeCountry}
                  onChange={change.bind(null, 'nativeCountry')}
                  helperText={touched.nativeCountry ? errors.nativeCountry : ""}
                  error={touched.nativeCountry && Boolean(errors.nativeCountry)}
                  fullWidth
                >
                  {
                    countryChoices.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>))
                  }
                </TextField>
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

Form.propTypes = {
  profile: PropTypes.object.isRequired,
  handleEdit: PropTypes.func
}

Form.defaultProps = {
  profile: {}
}
