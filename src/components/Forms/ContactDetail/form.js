import React,{useState, useEffect} from 'react';
import { useTranslation } from "react-i18next";
import { connect } from 'react-redux';
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
import { relationshipChoices } from 'Mockdata/relationshipChoices.json';

export function Form(props) {
  const classes = useStyles();
  const { i18n } = useTranslation();
  
  const {
    values: {
      phone_number,
      phone_number_belongs_to,
      address,
      municipalWard,
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
  } = props;

  const change = (e) => {
    saveProfile(e.target.name, e.target.value)
    setFieldTouched(e.target.name, true, false);
    if(e.target.value){
      setFieldTouched(e.target.name, false, true);
    }
    if(Object.keys(touched).length >= 5){
    let error = false;
    Object.entries(touched).map(item => {
        if(item[1] === true || e.target.value === ""){
          error = true;
          return;
        }
    })
    handleError(error);
  }
  };

  return (
  <form >
    <Card className={classes.root} elevation={4}>
      <CardHeader className="pb-0"
        title={i18n.t('Contact Details')}
      />
      <CardContent>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <TextField
              name="phone_number"
              type="number"
              label={i18n.t('Phone number')}
              fullWidth
              value={phone_number}
              onChange={change}
              helperText={touched.phone_number ? errors.phone_number : ""}
              error={touched.phone_number && Boolean(errors.phone_number)}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              select
              name="phone_number_belongs_to"
              label={i18n.t('Contact Number belongs to?')}
              value={phone_number_belongs_to}
              onChange={change}
              helperText={touched.phone_number_belongs_to ? errors.phone_number_belongs_to : ""}
              error={touched.phone_number_belongs_to && Boolean(errors.phone_number_belongs_to)}
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
              onChange={change}
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
              onChange={change}
              helperText={touched.municipalWard ? errors.municipalWard : ""}
              error={touched.municipalWard && Boolean(errors.municipalWard)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
            select
              name="district"
              label={i18n.t('District')}
              value={district}
              onChange={change}
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
              onChange={change}
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
              multiline
              name="native_country"
              label={i18n.t('native country of patient')}
              value={native_country}
              onChange={change}
              helperText={touched.native_country ? errors.address : ""}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              multiline
              name="native_state"
              label={i18n.t('native state of patient')}
              value={native_state}
              onChange={change}
              helperText={touched.native_state ? errors.native_state : ""}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="pincode"
              label={i18n.t('Pincode')}
              value={pincode}
              onChange={change}
              helperText={touched.pincode ? errors.pincode : ""}
              error={touched.pincode && Boolean(errors.pincode)}
              fullWidth
            />
          </Grid>
          {
            editMode && 
            <Grid item xs={12} sm={3} className="ml-auto">
              <Button
                fullWidth
                type="submit"
                onclick={handleSubmit}
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
