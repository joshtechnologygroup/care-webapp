import React, { useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { PropTypes } from 'prop-types';
import {
  Grid,
  TextField,
  Button,
  Typography,
  InputAdornment,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { Event } from '@material-ui/icons';
import DateFnsUtils from '@date-io/date-fns';

import { SingleSelectChipsInput } from 'Components/Inputs';

import { facility_status_choices } from 'Constants/app.const';

export default function Form(props) {
  const { i18n } = useTranslation();
  const {
    details: {
      facility,
      patient_facility_id,
      admitted_at,
      patient_status,
      discharged_at
    },
    errors,
    handleSubmit,
    setFieldValue,
    setFieldTouched,
    cancelCallback,
    saveFacilityDetails,
    shortFacilities,
    editMode,
    setPatientFacilityForm,
    validateForm,
    fieldErrorDict,
    touched,
  } = props;

  useEffect(()=>{
    if(setPatientFacilityForm) {
      setPatientFacilityForm(validateForm);
    }
  },[])

  const onSelectFacility = (event, value) => {
    const name = "facility"
    setFieldTouched(name);
    setFieldValue(name, value.id);
    saveFacilityDetails(name, value.id);
  }

  const setDateTime = (name, value) => {
    setFieldValue(name, value);
    setFieldTouched(name);
    saveFacilityDetails(name, value);
  }

  const setStatus = (name, val) => {
    setFieldValue(name, val);
    saveFacilityDetails(name, val);
  }

  const setFacilityId = (event) => {
    const { name, value } = event.target;
    setFieldValue(name, value);
    setFieldTouched(name, true, false);
    if (value) {
      setFieldTouched(name, false, true);
    }
    saveFacilityDetails(name, value);
  }
  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>

        <Grid className="pb-0" item xs={12} sm={6}>
          <Autocomplete
            options={shortFacilities}
            getOptionLabel={(option) => option.name}
            onChange={onSelectFacility}
            renderInput={(params) =>
              <TextField
                {...params}
                value={facility}
                name="facility"
                label={i18n.t('Select Facility')}
                fullWidth
                className="field"
                variant="outlined"
                helperText={touched.facility ? errors.facility : "" || (fieldErrorDict ? fieldErrorDict.facility : "")}
                error={touched.facility && Boolean(errors.facility) || (fieldErrorDict ? fieldErrorDict.facility : "")}
               />

            }
          />
          <TextField
            name="patient_facility_id"
            label={i18n.t('Patient facility id')}
            value={patient_facility_id}
            onChange={setFacilityId}
            helperText={touched.patient_facility_id ? errors.patient_facility_id : "" || (fieldErrorDict ? fieldErrorDict.patient_facility_id : "")}
            error={touched.patient_facility_id && Boolean(errors.patient_facility_id) || (fieldErrorDict ? fieldErrorDict.patient_facility_id : "")}
            fullWidth
            className="field"
            variant="outlined"
            type="number"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DateTimePicker
              label={i18n.t('Admitted Date/time')}
              inputVariant="outlined"
              value={admitted_at}
              onChange={(val) => setDateTime("admitted_at", val)}
              className="field"
              name="admitted_at"
              disableFuture
              format="dd/MM/yyyy"
              InputProps={{
                endAdornment: (
                  <InputAdornment><Event /></InputAdornment>
                ),
              }}
              fullWidth
            />
          </MuiPickersUtilsProvider>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DateTimePicker
              label={i18n.t('Discharged Date/time')}
              inputVariant="outlined"
              value={discharged_at}
              onChange={(val) => setDateTime("discharged_at", val)}
              className="field"
              name="discharged_at"
              disableFuture
              format="dd/MM/yyyy"
              InputProps={{
                endAdornment: (
                  <InputAdornment><Event /></InputAdornment>
                ),
              }}
              fullWidth
            />
          </MuiPickersUtilsProvider>
        </Grid>


        <Grid className="pb-0 mb-10" item xs={12}>
          <Typography variant="h6">
            {i18n.t('status')}
          </Typography>
          <SingleSelectChipsInput
            value={patient_status}
            options={facility_status_choices}
            onChange={(val) => setStatus('patient_status', val)}
            valueKey="id"
          />
          <h5 className="text--error">
            {touched.patient_facility_id && Boolean(errors.patient_facility_id) || (fieldErrorDict ? fieldErrorDict.patient_facility_id : "") && errors.patient_status}
          </h5>
        </Grid>
        { editMode &&
          <Grid container justify="flex-end" className="mt-10" item xs={12}>
            <Button
              variant="contained"
              disableElevation
              size="medium"
              className="btn py-5"
              onClick={cancelCallback}
            >
              {i18n.t('Cancel')}
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disableElevation
              size="medium"
              className="btn py-5 ml-10"
            >
              {i18n.t('Save')}
            </Button>
          </Grid>
        }
      </Grid>
    </form>
  );
}

Form.propTypes = {
  details: PropTypes.object.isRequired,
  handleEdit: PropTypes.func
}

Form.defaultProps = {
  details: {}
}
