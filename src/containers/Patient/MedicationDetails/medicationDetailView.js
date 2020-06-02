import React from 'react';
import { useTranslation } from "react-i18next";
import moment from 'moment';
import {
  Grid,
  Card,
  Button,
  CardContent,
  IconButton,
  Typography,
  Chip,
  Fab,
} from '@material-ui/core';
import _ from "underscore";
import { EditOutlined, MailOutline, PhoneOutlined, Add } from '@material-ui/icons';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { PropTypes } from 'prop-types';
// import CreateUpdateDoctor from './CreateUpdateDoctor';
import NullState from 'Components/NullState';
import imgNull from 'Assets/images/doctor-attendant.jpg';
import Styles from './styles';
import { symptomChoices } from 'Mockdata/symptomChoices.json';
import { diseaseChoices } from 'Mockdata/diseaseChoices.json';
import { booleanStatuses } from 'Constants/app.const';
import { clinicalStatusChoices } from 'Mockdata/clinicalStatusChoices.json';
import { CovidStatusChoices } from 'Mockdata/CovidStatusChoices.json';
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
        <Chip label={profile.covid_status ? CovidStatusChoices[profile.covid_status].name : profile.covid_status} className={`mt-5 ${CovidStatusChoices[profile.covid_status].name  === 'Positive' ? 'danger' : 'success'}`} />
      </Grid>
      <Grid item xs={12} className="pt-0">
        <Typography variant="h5" color="primary" className="d-flex">
          {i18n.t('Clinical Status')}
        </Typography>
        <Chip label={profile.clinical_status ? clinicalStatusChoices[profile.clinical_status].name : profile.clinical_status} className={`mt-5 ${clinicalStatusChoices[profile.clinical_status].name === 'Mild symptoms' ? 'danger' : 'success'}`} />
      </Grid>
      {!_.isEmpty(profile.symptoms) &&
        <Grid item xs={12} className="pt-0">
          <Typography variant="h5" color="primary" className="d-flex">
            {i18n.t('List of all COVID symptoms in the patient')}
          </Typography>
          {
            profile.symptoms.map((symptom, index) =>
              <Chip key={index} label={symptomChoices[symptom].name} className="mr-5 mt-5 pinkGrad" />
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
              <Chip key={index} label={diseaseChoices[disease].name} className="mr-5 mt-5 blueGrad" />
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
