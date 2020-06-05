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
import { relationshipChoices } from 'Mockdata/relationshipChoices.json';
import { reachableStatus } from 'Constants/app.const';

export default function Form(props) {
  const { i18n } = useTranslation();
  const {
    details: {
      status,
      name,
      patient_phone_number,
      relation,
      called_at,
      comments
    },
    errors,
    handleSubmit,
    setFieldValue,
    setFieldTouched,
    cancelCallback,
  } = props;

  const changeText = (name, e) => {
    setFieldTouched(e.target.name);
    setFieldValue(name, e.target.value);
  };

  const setDateTime = (e) => {
    console.log('e', e)
    setFieldValue('called_at', e);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} className="mb-10">
          <Typography variant="h6">
            {i18n.t('Contact status')}
          </Typography>
          <SingleSelectChipsInput
            value={status}
            options={reachableStatus}
            onChange={(val) => setFieldValue('status', val)}
            valueKey="value"
          />
          <h5 className="text--error">
            {errors.status}
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
          <TextField
            name="name"
            label={i18n.t('Portie Name')}
            fullWidth
            defaultValue={name}
            onChange={changeText.bind(null, "name")}
            className="field"
            variant="outlined"
            helperText={errors.name}
            error={Boolean(errors.name)}
          />
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
            helperText={errors.patient_phone_number}
            error={Boolean(errors.patient_phone_number)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField 
            select
            name="relation"
            defaultValue={relation}
            label={i18n.t('Patient relation')}
            fullWidth
            onChange={changeText.bind(null, "relation")}
            className="field"
            variant="outlined"
            helperText={errors.relation}
            error={Boolean(errors.relation)}
          >
            {
            relationshipChoices.map((option) => (
              <MenuItem key={option.id} value={option.name}>
                {option.name}
              </MenuItem>))
            }
          </TextField>
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
            helperText={errors.comments}
            error={Boolean(errors.comments)}
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
