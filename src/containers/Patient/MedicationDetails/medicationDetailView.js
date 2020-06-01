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
import { EditOutlined, MailOutline, PhoneOutlined, Add } from '@material-ui/icons';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { PropTypes } from 'prop-types';
// import CreateUpdateDoctor from './CreateUpdateDoctor';
import NullState from 'Components/NullState';
import imgNull from 'Assets/images/doctor-attendant.jpg';
import Styles from './styles';

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
        <Chip label={profile.covidStatus} className={`mt-5 + ${profile.covidStatus === 'Positive'? 'danger' : 'success'}`} />
      </Grid>
      <Grid item xs={12} className="pt-0">
        <Typography variant="h5" color="primary" className="d-flex">
          {i18n.t('Clinical Status')}
        </Typography>
        <Chip label={profile.clinicalStatus} className={`mt-5 + ${profile.clinicalStatus === 'Mild'? 'danger' : 'success'}`} />
      </Grid>
      <Grid item xs={12} className="pt-0">
        <Typography variant="h5" color="primary" className="d-flex">
          {i18n.t('List of all COVID symptoms in the patient')}
        </Typography>
        {
          profile.symptoms.map((symptom, index) => 
            <Chip key={index} label={symptom} className="mr-5 mt-5 pinkGrad" />
          )
        }
      </Grid>
      <Grid item xs={12} className="pt-0">
        <Typography variant="h5" color="primary" className="d-flex">
          {i18n.t('List of all non-COVID disease in the patient')}
        </Typography>
        {
          profile.nonCovidDiseases.map((val, index) => 
            <Chip key={index} label={val} className="mr-5 mt-5 blueGrad" />
          )
        }
      </Grid>
    </Grid>
  );
}

MedicationDetailView.propTypes = {
  profile: PropTypes.object.isRequired,
};

MedicationDetailView.defaultProps = {
  profile: {}
};
