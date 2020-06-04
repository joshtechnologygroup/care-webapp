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
import { labTestStatusChoices } from 'Mockdata/labTestStatusChoices.json';
import { labs } from 'Mockdata/labs.json';

export default function Form(props) {
  const { i18n } = useTranslation();
  const {
    details: {
      testing_lab,
      date_of_sample,
      result
    },
    errors,
    handleSubmit,
    setFieldValue,
    setFieldTouched,
    cancelCallback,
    saveLabDetails,
    testingLabs,
  } = props;

  const setDate = (e) => {
    setFieldValue('date_of_sample', e);
    setFieldTouched('date_of_sample');
    if(saveLabDetails) {
      saveLabDetails('date_of_sample', e);
    }
  }

  const setStatus = (name, val) =>{
    setFieldValue(name, val);
    if(saveLabDetails){ 
      saveLabDetails(name, val);
    }
  }

  const onSelectLab = (event, value) => {
    setFieldValue("testing_lab", value.id);
    if(saveLabDetails){ 
      saveLabDetails("testing_lab", value.id);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>

        <Grid className="pb-0" item xs={12} sm={6}>
          <Autocomplete
            options={labs}
            getOptionLabel={(option) => option.name}
            onChange={(event, value) => onSelectLab(event, value)}
            renderInput={(params) => 
            <TextField
              {...params}
              name="testing_lab"
              label={i18n.t('Testing Lab name')}
              fullWidth
              value={testing_lab}
              className="field"
              variant="outlined"
              helperText={errors.testing_lab}
              error={Boolean(errors.testing_lab)}
            />
          }
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DateTimePicker
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


        <Grid className="pb-0 mb-10" item xs={12}>
          <Typography variant="h6">
            {i18n.t('Result')}
          </Typography>
          <SingleSelectChipsInput
            value={result}
            options={labTestStatusChoices}
            onChange={(val) => setStatus('result', val)}
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
