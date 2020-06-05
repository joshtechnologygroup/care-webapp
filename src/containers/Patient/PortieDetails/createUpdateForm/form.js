import React from 'react';
import { useTranslation } from "react-i18next";
import { PropTypes } from 'prop-types';
import {
    Grid,
    TextField,
    InputAdornment,
    MenuItem,
    Button,
    Typography,
} from '@material-ui/core';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { Event } from '@material-ui/icons';
import DateFnsUtils from '@date-io/date-fns';

import { SingleSelectChipsInput } from 'Components/Inputs';

// Importing mock data
import { reachableStatus } from 'Constants/app.const';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from 'react-select'
import _ from 'underscore';
import { RELATIONSHIP_OPTIONS } from "Src/constants/"

export default function Form(props) {
  const { i18n } = useTranslation();
  const {
    details: {
      able_to_connect,
      portie,
      patient_phone_number,
      relation,
      called_at,
      comments,
    },
    porteaUsers,
    errors,
    handleSubmit,
    setFieldValue,
    setFieldTouched,
    cancelCallback,
    touched,
    createPortieErrors,
    updatePortieErrors
  } = props;

  console.log(errors);

  const changeText = (name, e) => {
    setFieldTouched(e.target.name);
    setFieldValue(name, e.target.value);
  };

  const setDateTime = (e) => {
    console.log('e', e)
    setFieldValue('called_at', e);
  };

  const porteaOptions = [];
  if(porteaUsers && !_.isEmpty(porteaUsers)) {
    Object.keys(porteaUsers).forEach((portea, index) =>{
        porteaOptions.push({
            'value': porteaUsers[portea].id,
            'label': porteaUsers[portea].name
        })
    })
  }

  return (
    <form onSubmit={handleSubmit}>
        {
        createPortieErrors && createPortieErrors.patient && 
        <FormControl component="fieldset" error={true}>
            <FormHelperText >{createPortieErrors.patient}</FormHelperText>
        </FormControl>
        }
        {
        updatePortieErrors && updatePortieErrors.patient && 
        <FormControl component="fieldset" error={true}>
            <FormHelperText >{updatePortieErrors.patient}</FormHelperText>
        </FormControl>
        }
      <Grid container spacing={2}>
        <Grid item xs={12} className="mb-10">
          <Typography variant="h6">
            {i18n.t('Contact status')}
          </Typography>
          <SingleSelectChipsInput
            options={reachableStatus}
            name="able_to_connect"
            onChange={(val) => {
                setFieldValue('able_to_connect', val);
            }}
            valueKey="value"
            value={able_to_connect}
          />
          <h5 className="text--error">
            {touched.able_to_connect && errors.able_to_connect}
          </h5>
        </Grid>
        <Grid item xs={12} sm={6}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DateTimePicker
              label={i18n.t('Date time')}
              inputVariant="outlined"
              value={called_at}
              onChange={setDateTime}
              className="field"
              name="called_at"
              disableFuture
              format="dd/MM/yyyy hh:mm a"
              InputProps={{
                endAdornment: (
                  <InputAdornment><Event /></InputAdornment>
                ),
              }}
              fullWidth
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item xs={12} sm={6}>
            <Select
                options={porteaOptions}
                name="portie"
                defaultValue={portie || ""}
                onChange={(val) => {
                    setFieldTouched('portie');
                    setFieldValue('portie', val.value);
                }}
                error={touched.portie && Boolean(errors.portie)}
            />
            {
            touched.portie && errors.portie && 
            <FormControl component="fieldset" error={true}>
                <FormHelperText >{errors.portie}</FormHelperText>
            </FormControl>
            }
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField 
            name="patient_phone_number"
            defaultValue={patient_phone_number}
            label={i18n.t('Patient contact number')}
            fullWidth
            onChange={changeText.bind(null, "patient_phone_number")}
            className="field"
            variant="outlined"
            helperText={touched.patient_phone_number && errors.patient_phone_number}
            error={touched.patient_phone_number && Boolean(errors.patient_phone_number)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
            <Select
                options={RELATIONSHIP_OPTIONS}
                defaultValue={""}
                name="relation"
                onChange={(val) => {
                    setFieldTouched('relation');
                    setFieldValue('relation', val.value);
                }}
                error={touched.relation && Boolean(errors.relation)}
            />
            {
            touched.relation && errors.relation && 
            <FormControl component="fieldset" error={true}>
                <FormHelperText >{errors.relation}</FormHelperText>
            </FormControl>
            }
        </Grid>
        <Grid item xs={12}>
          <TextField 
            multiline
            name="comments"
            defaultValue={comments}
            label={i18n.t('Comments')}
            fullWidth
            onChange={changeText.bind(null, "comments")}
            className="field"
            variant="outlined"
            helperText={touched.comments && errors.comments}
            error={touched.comments && Boolean(errors.comments)}
          />
        </Grid>
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
      </Grid>
    </form>
  );
}

Form.propTypes = {
    profile: PropTypes.object.isRequired,
    handleEdit: PropTypes.func
};

Form.defaultProps = {
    profile: {}
};
