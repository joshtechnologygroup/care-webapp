import React from 'react';
import { useTranslation } from "react-i18next";
import { PropTypes } from 'prop-types';
import moment from 'moment';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Chip,
  Fab,
  Tooltip,
} from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { PhoneOutlined, EventOutlined, AccessTime } from '@material-ui/icons';

// IMPORTING MOCK CHOICES
import { facilityStatusChoices } from 'Mockdata/facilityStatusChoices.json';

const useStyles = makeStyles(theme =>
  createStyles({
    chip: {
      minWidth: theme.typography.pxToRem(160),
    },
  })
);

export default function FacilityDetailCard(props) {
  const classes = useStyles();
  const { i18n } = useTranslation();
  const { details } = props;

  return (
    <Card className="mb-0" elevation={4}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
            <Typography variant="h5" color="primary">
              <Tooltip title={i18n.t('Facility name')}>
                <span>{details.name}</span>
              </Tooltip>
              <Typography variant="inherit" className="text--gray">
                #{details.id}
              </Typography>
            </Typography>
            <Typography variant="h6">
              <Tooltip title={i18n.t('Facility type')}>
                <span>{details.type}</span>
              </Tooltip>
            </Typography>
            <Typography variant="h6">
              <Tooltip title={i18n.t('Facility district')}>
                <span>{details.district}</span>
              </Tooltip>
            </Typography>
            <Typography variant="h6">
              <Tooltip title={i18n.t('Facility ownership')}>
                <span>{details.ownership}</span>
              </Tooltip>
            </Typography>
          </Grid>

          <Grid item xs={12} sm={3}>
            <h6 className="heading--sub">{i18n.t('Admitted date/time')}</h6>
            <Typography variant="h6" className="d-flex">
              <EventOutlined className="mr-5" />
              {moment.unix(details.admitted_date_time).format("DD-MMM-YYYY")}
            </Typography>
            <Typography variant="h6" className="d-flex">
              <AccessTime className="mr-5" />
              {moment.unix(details.admitted_date_time).format("HH:MM A")}
            </Typography>
          </Grid>

          {
            Boolean(details.discharged_date_time) &&
            <Grid item xs={12} sm={2}>
              <h6 className="heading--sub">{i18n.t('Discharged on')}</h6>
              <Typography variant="h6" className="d-flex">
                <EventOutlined className="mr-5" />
                {moment.unix(details.discharged_date_time).format("DD-MMM-YYYY")}
              </Typography>
              <Typography variant="h6" className="d-flex">
                <AccessTime className="mr-5" />
                {moment.unix(details.discharged_date_time).format("HH:MM A")}
              </Typography>
            </Grid>
          }

          <Grid item xs={12} sm={3} className="ml-auto text-right">
            <Chip
              label={
                facilityStatusChoices.map(choice => {
                  return choice.id === details.status ? choice.name : ''
                })
              }
              className={
                facilityStatusChoices.map(choice => {
                  return choice.id === details.status ? `${classes.chip} ${choice.theme}` : ''
                }).join(' ')
              }
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

FacilityDetailCard.propTypes = {
  details: PropTypes.object.isRequired,
};

FacilityDetailCard.defaultProps = {
  details: {}
};
