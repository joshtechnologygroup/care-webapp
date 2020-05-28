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
} from '@material-ui/core';
import { PropTypes } from 'prop-types';
import useStyles from './styles';

// IMORTING MOCKDATA
import { stateChoices } from 'Mockdata/stateChoices.json';

export default function Form(props) {
  const classes = useStyles();
  const { i18n } = useTranslation();
  const {
    values: {
      facilityName,
      facilityId,
      address,
      municipalWard,
      city,
      district,
      state,
      pincode,
    },
    errors,
    touched,
    handleSubmit,
    handleChange,
    setFieldTouched,
    editMode,
  } = props;
  
  const change = (name, e) => {
    handleChange(e);
    setFieldTouched(e.target.name, true, false);
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
              name="facilityName"
              label={i18n.t('Facility facilityName')}
              fullWidth
              value={facilityName}
              onChange={change.bind(null, 'facilityName')}
              helperText={touched.facilityName ? errors.facilityName : ""}
              error={touched.facilityName && Boolean(errors.facilityName)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="facilityId"
              label={i18n.t('Facility Id')}
              fullWidth
              value={facilityId}
              onChange={change.bind(null, 'facilityId')}
              helperText={touched.facilityId ? errors.facilityId : ""}
              error={touched.facilityId && Boolean(errors.facilityId)}
            />
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
