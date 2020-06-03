import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { PropTypes } from 'prop-types';
import moment from 'moment';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Chip,
  Tooltip,
} from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { EventOutlined, AccessTime } from '@material-ui/icons';
import { DATE_FORMAT } from 'Src/constants';
import { connect } from 'react-redux';
import _ from "underscore";
// IMPORTING MOCK CHOICES
import { facilityStatusChoices } from 'Mockdata/facilityStatusChoices.json';

const useStyles = makeStyles(theme =>
  createStyles({
    chip: {
      minWidth: theme.typography.pxToRem(160),
    },
  })
);

export function FacilityDetailCard(props) {
  const classes = useStyles();
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false)
  const { details, districtsList, facilityTypesList, currentStatus, ownershipTypesList } = props;
  useEffect(() => {
    if (!_.isEmpty(districtsList) && !_.isEmpty(facilityTypesList) && !_.isEmpty(currentStatus) && !_.isEmpty(ownershipTypesList)) {
      setOpen(true);
    }
  }, [districtsList, facilityTypesList, ownershipTypesList, currentStatus]);

  if (open) {
    let district = Object.keys(districtsList).find(item => districtsList[item].id === details.district);
    if (district) {
      district = districtsList[district].name;
    }
    let facilityType = Object.keys(facilityTypesList).find(item => facilityTypesList[item].id === details.facility_type);
    if (facilityType) {
      facilityType = facilityTypesList[facilityType].name;
    }
    let ownershipType = Object.keys(ownershipTypesList).find(item => ownershipTypesList[item].id === details.owned_by);
    if (ownershipType) {
      ownershipType = ownershipTypesList[ownershipType].name;
    }
    let status = Object.keys(currentStatus).find(item => currentStatus[item].id === details.patient_status);
    if (status) {
      status = currentStatus[status].name;
    }

    return (
      <Card className="mb-0" elevation={4}>
        {status !== 'Home Isolation' &&
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
                    <span>{facilityType}</span>
                  </Tooltip>
                </Typography>
                <Typography variant="h6">
                  <Tooltip title={i18n.t('Facility district')}>
                    <span>{district}</span>
                  </Tooltip>
                </Typography>
                <Typography variant="h6">
                  <Tooltip title={i18n.t('Facility ownership')}>
                    <span>{ownershipType}</span>
                  </Tooltip>
                </Typography>
              </Grid>
              {details.admitted_at &&
                <Grid item xs={12} sm={3}>
                  <h6 className="heading--sub">{i18n.t('Admitted date/time')}</h6>
                  <Typography variant="h6" className="d-flex">
                    <EventOutlined className="mr-5" />
                    {moment(details.admitted_at).format("DD-MMM-YYYY")}
                  </Typography>
                  <Typography variant="h6" className="d-flex">
                    <AccessTime className="mr-5" />
                    {moment(details.admitted_at).format("HH:MM A")}
                  </Typography>
                </Grid>
              }
              {
                Boolean(details.discharged_at) &&
                <Grid item xs={12} sm={2}>
                  <h6 className="heading--sub">{i18n.t('Discharged on')}</h6>
                  <Typography variant="h6" className="d-flex">
                    <EventOutlined className="mr-5" />
                    {moment(details.discharged_at).format("DD-MMM-YYYY")}
                  </Typography>
                  <Typography variant="h6" className="d-flex">
                    <AccessTime className="mr-5" />
                    {moment(details.discharged_at).format("HH:MM A")}
                  </Typography>
                </Grid>
              }
              <Grid item xs={12} sm={3} className="ml-auto text-right">
                <Chip
                  label={
                    currentStatus.map(choice => {
                      return choice.id === details.patient_status ? choice.name : ''
                    })
                  }
                  className={
                    currentStatus.map(choice => {
                      return choice.id === details.patient_status ? `${classes.chip} ${choice.theme}` : ''
                    }).join(' ')
                  }
                />
              </Grid>
            </Grid>
          </CardContent>
        }
      </Card>
    );
  } else {
    return (
      <div>
        loader
                </div>
    )
  }
}

FacilityDetailCard.propTypes = {
  details: PropTypes.object.isRequired,
  facilityTypesList: PropTypes.array.isRequired,
  ownershipTypesList: PropTypes.array.isRequired,
  districtsList: PropTypes.array.isRequired,
  currentStatus: PropTypes.array.isRequired,
};

FacilityDetailCard.defaultProps = {
  details: {}
};

const mapStateToProps = (state) => ({
  facilityTypesList: state.facilityTypes.results,
  ownershipTypesList: state.ownershipTypes.results,
  districtsList: state.districts.results,
  currentStatus: state.currentStatus.results,
});


export default connect(mapStateToProps, null)(FacilityDetailCard);
