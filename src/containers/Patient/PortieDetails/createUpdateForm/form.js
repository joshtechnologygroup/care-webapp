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
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
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
    values: {
      able_to_connect,
      portie,
      patient_phone_number,
      relation,
      called_at,
      comments,
    },
    initialValues,
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

  const changeText = (e, name) => {
    setFieldTouched(e.target.name);
    setFieldValue(name, e.target.value);
  };

  const [date, setDate] = React.useState(called_at);
  const setDateTime = (e) => {
    setDate(e);
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
          <p className="text--error">{createPortieErrors.patient}</p>
        }
        {
          updatePortieErrors && updatePortieErrors.patient &&
          <p className="text--error">{updatePortieErrors.patient}</p>
        }
        {
          createPortieErrors && createPortieErrors.non_field_errors && 
          <p className="text--error">{createPortieErrors.non_field_errors}</p>
        }
        {
          updatePortieErrors && updatePortieErrors.non_field_errors && 
          <p className="text--error">{updatePortieErrors.non_field_errors}</p>
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
            {createPortieErrors && createPortieErrors.able_to_connect}
            {updatePortieErrors && updatePortieErrors.able_to_connect}
          </h5>
        </Grid>
        <Grid item xs={12} sm={6}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDateTimePicker
              label={i18n.t('Date time')}
              inputVariant="outlined"
              value={date}
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
              className={`react-select ${touched.portie && Boolean(errors.portie) && 'react-select__error'}`}
              options={porteaOptions}
              name="portie"
              defaultValue={portie && porteaOptions.find(item => item.value == portie)}
              placeholder={i18n.t('Select Portie')}
              onChange={(val) => {
                  setFieldTouched('portie');
                  setFieldValue('portie', val.value);
              }}
            />
            {
              touched.portie && errors.portie && 
              <p className="text--error">{errors.portie}</p>
            }
            {
              createPortieErrors && createPortieErrors.portie && 
              <p className="text--error">{createPortieErrors.portie}</p>
            }
            {
              updatePortieErrors && updatePortieErrors.portie && 
              <p className="text--error">{updatePortieErrors.portie}</p>
            }
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField 
            name="patient_phone_number"
            value={patient_phone_number}
            label={i18n.t("Patient's contact number")}
            fullWidth
            onChange={(e) => changeText(e, "patient_phone_number")}
            className="field"
            variant="outlined"
            helperText={touched.patient_phone_number && errors.patient_phone_number}
            error={touched.patient_phone_number && Boolean(errors.patient_phone_number)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
            <Select
              className={`react-select ${touched.relation && Boolean(errors.relation) && 'react-select__error'}`}
              options={RELATIONSHIP_OPTIONS}
              value={RELATIONSHIP_OPTIONS.find(choice => choice.value === relation)}
              placeholder={i18n.t('Relation with patient')}
              name="relation"
              onChange={(val) => {
                  setFieldTouched('relation');
                  setFieldValue('relation', val.value);
              }}
            />
            {
              touched.relation && errors.relation &&
              <p className="text--error">{errors.relation}</p>
            }
            {
              createPortieErrors && createPortieErrors.relation && 
              <p className="text--error">{createPortieErrors.relation}</p>
            }
            {
              updatePortieErrors && updatePortieErrors.relation && 
              <p className="text--error">{updatePortieErrors.relation}</p>
            }
        </Grid>
        <Grid item xs={12}>
          <TextField 
            multiline
            name="comments"
            defaultValue={comments}
            label={i18n.t('Comments')}
            fullWidth
            onChange={(e) => changeText(e, "comments")}
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
