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
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { Event } from '@material-ui/icons';
import DateFnsUtils from '@date-io/date-fns';

import { SingleSelectChipsInput } from 'Components/Inputs';

import { facility_status_choices, TRANSFERRED_TO_ANOTHER_FACILITY, DISCHARGED } from 'Constants/app.const';
import { DATE_TIME_FORMAT } from 'Src/constants'

export default function Form(props) {
  const { i18n } = useTranslation();
  const {
    details: {
      facility,
      patient_facility_id,
      admitted_at,
      patient_status,
      discharged_at,
      transfer_facility,
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

  useEffect(() => {
    if (setPatientFacilityForm) {
      setPatientFacilityForm(validateForm);
    }
  }, [])

  const onSelectFacility = (name, event, value) => {
    setFieldTouched(name, true, false);
    if (value) {
      setFieldTouched(name, false, true);
      setFieldValue(name, value.id);
      saveFacilityDetails(name, value.id);
    }
  }

  const [admitted, setAdmitted] = React.useState(admitted_at);
  const [discharged, setDischarged] = React.useState(discharged_at ? discharged_at : null);
  const [completed, setCompeleted] = React.useState(false);
  const [transfered, setTransfered] = React.useState(false);

  const setDateTime = (name, value) => {
    name === "admitted_at" ? setAdmitted(value) : setDischarged(value);
    setFieldValue(name, value);
    setFieldTouched(name);
    saveFacilityDetails(name, value);
  }

  const setStatus = (name, val) => {
    setFieldValue(name, val);
    if (val && [TRANSFERRED_TO_ANOTHER_FACILITY, DISCHARGED].indexOf(val) >= 0) {
      setCompeleted(true);
    } else {
      setCompeleted(false);
    }
    if (val === TRANSFERRED_TO_ANOTHER_FACILITY) {
      setTransfered(true);
    } else {
      setTransfered(false);
    }
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
            onChange={(event, value) => onSelectFacility("facility", event, value)}
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
            className="field mt-10"
            variant="outlined"
            type="number"
          />
          {transfered &&
            <Autocomplete
              options={shortFacilities}
              getOptionLabel={(option) => option.name}
              onChange={(event, value) => onSelectFacility("transfer_facility", event, value)}
              renderInput={(params) =>
                <TextField
                  {...params}
                  value={transfer_facility}
                  name="transfer_facility"
                  label={i18n.t('Select Transfer Facility')}
                  fullWidth
                  className="field"
                  variant="outlined"
                  helperText={touched.transfer_facility ? errors.transfer_facility : "" || (fieldErrorDict ? fieldErrorDict.transfer_facility : "")}
                  error={touched.transfer_facility && Boolean(errors.transfer_facility) || (fieldErrorDict ? fieldErrorDict.transfer_facility : "")}
                />

              }
            />
          }
        </Grid>

        <Grid item xs={12} sm={6}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDateTimePicker
              label={i18n.t('Admitted date/time')}
              inputVariant="outlined"
              value={admitted}
              onChange={(val) => setDateTime("admitted_at", val)}
              className="field"
              name="admitted_at"
              disableFuture
              format={DATE_TIME_FORMAT}
              InputProps={{
                endAdornment: (
                  <InputAdornment><Event /></InputAdornment>
                ),
              }}
              fullWidth
            />
          </MuiPickersUtilsProvider>
          {completed &&
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDateTimePicker
                label={transfered ? i18n.t('Transfered Date/time') : i18n.t('Discharged Date/time')}
                inputVariant="outlined"
                value={discharged}
                onChange={(val) => setDateTime("discharged_at", val)}
                className="field mt-10"
                name="discharged_at"
                disableFuture
                format={DATE_TIME_FORMAT}
                InputProps={{
                  endAdornment: (
                    <InputAdornment><Event /></InputAdornment>
                  ),
                }}
                fullWidth
                helperText={touched.discharged_at && errors.discharged_at || (fieldErrorDict ? fieldErrorDict.discharged_at : "")}
                error={touched.discharged_at && Boolean(errors.discharged_at) || (fieldErrorDict ? fieldErrorDict.discharged_at : "")}
              />
            </MuiPickersUtilsProvider>
          }
        </Grid>


        <Grid className="pb-0 mb-10" item xs={12}>
          <Typography variant="h6">
            {i18n.t('Status')}
          </Typography>
          <SingleSelectChipsInput
            value={patient_status}
            options={facility_status_choices}
            onChange={(val) => setStatus('patient_status', val)}
            valueKey="id"
          />
          <h5 className="text--error">
            {touched.patient_status && Boolean(errors.patient_status) || (fieldErrorDict ? fieldErrorDict.patient_status : "")}
          </h5>
        </Grid>
        {editMode &&
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
