import React from 'react';
import { useTranslation } from "react-i18next";
import {
  Grid,
  Typography,
  Button
} from '@material-ui/core';
import { MultiSelectChipsInput, SingleSelectChipsInput } from 'Components/Inputs';
import { PropTypes } from 'prop-types';

// IMPORTING MOCK CHOICES
import { symptomChoices } from 'Mockdata/symptomChoices.json';
import { diseaseChoices } from 'Mockdata/diseaseChoices.json';
import { booleanStatuses } from 'Constants/app.const';
import { clinicalStatusChoices } from 'Mockdata/clinicalStatusChoices.json';

export default function Form(props) {
  const { i18n } = useTranslation();

  const {
    values: {
      covid_status,
      clinical_status,
      symptoms,
      nonCovidDiseases,
    },
    handleSubmit,
    setFieldValue,
    cancelCallback,
    editMode,
  } = props;

  const setValue = (val, name) => {
    setFieldValue(name, val);
  };

  return (
  <form onSubmit={handleSubmit}>
    <Grid container spacing={5}>
      <Grid item xs={12}>
        <Typography variant="h5" color="primary" className="d-flex">
          {i18n.t('COVID-19 Status')}
        </Typography>
        <SingleSelectChipsInput
          value={covid_status}
          options={booleanStatuses.positiveNegative}
          onChange={(val) => setValue(val, 'covid_status')}
        />
      </Grid>

      <Grid item xs={12} className="pt-0">
        <Typography variant="h5" color="primary" className="d-flex">
          {i18n.t('Clinical Status')}
        </Typography>
        <SingleSelectChipsInput
          value={clinical_status}
          options={clinicalStatusChoices}
          onChange={(val) => setValue(val, 'clinical_status')}
        />
      </Grid>

      <Grid item xs={12} className="pt-0">
        <Typography variant="h5" color="primary" className="d-flex">
          {i18n.t('List of all COVID symptoms in the patient')}
        </Typography>
        <MultiSelectChipsInput
          options={symptomChoices}
          value={symptoms}
          onChange={(val) => setValue(val, 'symptoms')}
          valueKey="id"
        />
      </Grid>

      <Grid item xs={12} className="pt-0">
        <Typography variant="h5" color="primary" className="d-flex">
          {i18n.t('List of all non-COVID disease in the patient')}
        </Typography>
        <MultiSelectChipsInput
          options={diseaseChoices}
          value={nonCovidDiseases}
          onChange={(val) => setValue(val, 'nonCovidDiseases')}
          valueKey="id"
        />
      </Grid>
      {
        editMode &&
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
  profile: PropTypes.object.isRequired,
  cancelCallback: PropTypes.func,
  editMode: PropTypes.bool
}

Form.defaultProps = {
  profile: {}
}
