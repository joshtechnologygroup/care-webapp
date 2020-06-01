import React from 'react';
import { useTranslation } from "react-i18next";
import { PropTypes } from 'prop-types';
import {
  Grid,
  TextField,
  Button,
  InputAdornment,
} from '@material-ui/core';

import Autocomplete from '@material-ui/lab/Autocomplete';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { Event } from '@material-ui/icons';
import DateFnsUtils from '@date-io/date-fns';

// Importing mock data
import { doctors } from 'Mockdata/doctors.json';

export default function Form(props) {
  const { i18n } = useTranslation();
  const {
    details: {
      name,
      date,
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
    setFieldValue('admitted_date_time', e);
    setFieldTouched('admitted_date_time');
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>

        <Grid className="pb-0" item xs={12} sm={6}>
          <Autocomplete
            options={doctors}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => 
            <TextField
              {...params}
              value={name}
              name="name"
              label={i18n.t('Select doctor')}
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
              label={i18n.t('Date & time')}
              inputVariant="outlined"
              value={date}
              onChange={setDateTime}
              className="field"
              name="date"
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
