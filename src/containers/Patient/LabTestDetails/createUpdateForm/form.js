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

import { labTestStatusChoices } from 'Constants/app.const';

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
    touched,
    values
  } = props;

  const changeText = (name, e) => {
    setFieldTouched(e.target.name);
    setFieldValue(name, e.target.value);
  };

  const [completed, setCompeleted] = React.useState(false);

  useEffect(() => {
    if(values.result && [3, 4].indexOf(values.result) >= 0) {
        setCompeleted(true)
    } else {
        setCompeleted(false);
    }
  }, [values.result])

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>

        <Grid className="pb-0" item xs={12} sm={6}>
          <Autocomplete
            options={testingLabs}
            getOptionLabel={(option) => option.name}
            name="testing_lab"
            onChange={(event, val) => {
                setFieldTouched('testing_lab');
                setFieldValue('testing_lab', val.id);
            }}
            renderInput={(params) => 
            <TextField
              {...params}
              value={testing_lab}
              label={i18n.t('Testing Lab name')}
              fullWidth
              className="field"
              variant="outlined"
              helperText={errors.testing_lab && touched.testing_lab}
              error={Boolean(errors.testing_lab) && touched.testing_lab}
            />
          }
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DateTimePicker
              label={i18n.t('Date of Sample')}
              inputVariant="outlined"
              value={date_of_sample}
              onChange={(val) => setFieldValue('date_of_sample', val)}
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
            value={result || ""}
            name="result"
            options={labTestStatusChoices}
            onChange={(val) => {
                setFieldTouched('result');
                setFieldValue('result', val);
            }}
            valueKey="id"
          />
          <h5 className="text--error">
            {touched.result && errors.result}
          </h5>
        </Grid>

        {
            completed &&
            <Grid item xs={12} sm={6}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DateTimePicker
                label={i18n.t('Date of Result')}
                inputVariant="outlined"
                value={date_of_sample}
                onChange={(val) => setFieldValue('date_of_result', val)}
                className="field"
                name="date_of_result"
                disableFuture
                format="dd/MM/yyyy"
                InputProps={{
                    endAdornment: (
                    <InputAdornment><Event /></InputAdornment>
                    ),
                }}
                fullWidth
                helperText={touched.testing_lab && errors.testing_lab}
                error={touched.testing_lab && Boolean(errors.testing_lab)}
                />
            </MuiPickersUtilsProvider>
            </Grid>
        }

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
