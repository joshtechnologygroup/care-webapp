import React from 'react';
import { useTranslation } from "react-i18next";
import {
  Grid,
  Typography,
  Chip,
} from '@material-ui/core';
import { PropTypes } from 'prop-types';
import Styles from './styles';
import { clinicalStatusChoices, CovidStatusChoices, symptomChoices, diseaseChoices } from 'Constants/app.const';
import _ from 'underscore';
export default function MedicationDetailView(props) {
  const classes = Styles();
  const { i18n } = useTranslation();
  const { profile } = props;

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Typography variant="h5" color="primary" className="d-flex">
          {i18n.t('COVID-19 Status')}
        </Typography>
        <Chip label={profile.covid_status ? CovidStatusChoices[profile.covid_status - 1].name : profile.covid_status} className={profile.covid_status ? `mt-5 ${CovidStatusChoices[profile.covid_status - 1].theme}` : 'mt-5 primary'} />
      </Grid>
      <Grid item xs={12} className="pt-0">
        <Typography variant="h5" color="primary" className="d-flex">
          {i18n.t('Clinical Status')}
        </Typography>
        <Chip label={profile.clinical_status ? clinicalStatusChoices[profile.clinical_status - 1].name : profile.clinical_status} className={profile.clinical_status ? `mt-5 ${clinicalStatusChoices[profile.clinical_status - 1].theme}` : `mt-5 primary`} />
      </Grid>
      {!_.isEmpty(profile.symptoms) &&
        <Grid item xs={12} className="pt-0">
          <Typography variant="h5" color="primary" className="d-flex">
            {i18n.t('List of all COVID symptoms in the patient')}
          </Typography>
          {
            profile.symptoms.map((symptom, index) =>
              <Chip key={index} label={symptomChoices[symptom - 1].name} className="mr-5 mt-5 pinkGrad" />
            )
          }
        </Grid>
      }
      { !_.isEmpty(profile.symptoms) &&
        <Grid item xs={12} className="pt-0">
          <Typography variant="h5" color="primary" className="d-flex">
            {i18n.t('List of all non-COVID disease in the patient')}
          </Typography>
          {
            profile.diseases.map((disease, index) =>
              <Chip key={index} label={diseaseChoices[disease-1].name} className="mr-5 mt-5 blueGrad" />
            )
          }
        </Grid>
      }
    </Grid>
  );
}

MedicationDetailView.propTypes = {
  profile: PropTypes.object.isRequired,
};

MedicationDetailView.defaultProps = {
  profile: {}
};
