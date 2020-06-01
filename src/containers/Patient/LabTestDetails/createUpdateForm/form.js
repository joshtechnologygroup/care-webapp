import React from 'react';
import { useTranslation } from "react-i18next";
import { PropTypes } from 'prop-types';
import {
  Grid,
  TextField,
  MenuItem,
  Button,
  Typography,
  InputAdornment,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { Event } from '@material-ui/icons';
import DateFnsUtils from '@date-io/date-fns';

import { SingleSelectChipsInput } from 'Components/Inputs';

// Importing mock data
import { labTestStatusChoices } from 'Mockdata/labTestStatusChoices.json';
import { labs } from 'Mockdata/labs.json';

export default function Form(props) {
  const { i18n } = useTranslation();
  const {
    details: {
      name,
      date_of_sample,
      result
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

  const setDate = (e) => {
    setFieldValue('date_of_sample', e);
    setFieldTouched('date_of_sample');
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
              label={i18n.t('Lab name')}
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
            <DatePicker
              label={i18n.t('Date time')}
              inputVariant="outlined"
              value={date_of_sample}
              onChange={setDate}
              className="field"
              name="date_of_sample"
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
            {i18n.t('result')}
          </Typography>
          <SingleSelectChipsInput
            value={result}
            options={labTestStatusChoices}
            onChange={(val) => setFieldValue('result', val)}
            valueKey="id"
          />
          <h5 className="text--error">
            {errors.result}
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
