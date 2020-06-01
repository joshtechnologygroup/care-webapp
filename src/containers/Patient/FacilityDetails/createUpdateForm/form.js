import React from 'react';
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

// Importing mock data
import { facilityStatusChoices } from 'Mockdata/facilityStatusChoices.json';
import { labs } from 'Mockdata/labs.json';

export default function Form(props) {
  const { i18n } = useTranslation();
  const {
    details: {
      name,
      admitted_date_time,
      status
    },
    touched,
    errors,
    handleSubmit,
    handleChange,
    setFieldValue,
    setFieldTouched,
    cancelCallback,
  } = props;

  const changeText = (name, e) => {
    setFieldTouched(e.target.name);
    setFieldValue(name, e.target.value);
  };

  const setDateTime = (e) => {
    setFieldValue('admitted_date_time', e);
    setFieldTouched('admitted_date_time');
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>

        <Grid className="pb-0" item xs={12} sm={6}>
          <Autocomplete
            options={labs}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => 
            <TextField
              {...params}
              name="name"
              label={i18n.t('Select Facility')}
              fullWidth
              onChange={changeText.bind(null, "name")}
              className="field"
              variant="outlined"
              helperText={errors.name}
              error={Boolean(errors.name)}
            />
          }
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DateTimePicker
              label={i18n.t('Admitted Date/time')}
              inputVariant="outlined"
              value={admitted_date_time}
              onChange={setDateTime}
              className="field"
              name="admitted_date_time"
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


        <Grid className="pb-0" item xs={12} className="mb-10">
          <Typography variant="h6">
            {i18n.t('status')}
          </Typography>
          <SingleSelectChipsInput
            value={status}
            options={facilityStatusChoices}
            onChange={(val) => setFieldValue('status', val)}
            valueKey="id"
          />
          <h5 className="text--error">
            {errors.status}
          </h5>
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
    details: PropTypes.object.isRequired,
    handleEdit: PropTypes.func
}

Form.defaultProps = {
    details: {}
}
