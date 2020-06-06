import React, { useEffect } from 'react';
import { useTranslation } from "react-i18next";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  makeStyles,
  createStyles,
  Chip,
} from '@material-ui/core';
import patientMale from 'Assets/images/patient-male.svg';
import patientFemale from 'Assets/images/patient-female.svg';
import { PropTypes } from 'prop-types';
import { GENDER_CHOICES, FACILITY_EXISTS_ID, patient_facility_status_choices } from 'Constants/app.const';
import { connect } from 'react-redux';
import { fetchClusterGroup } from 'Actions/PatientDetailsAction';

const useStyles = makeStyles(theme =>
  createStyles({
    input: {
      display: 'none',
    },
    image: {
      background: '#ececec',
      width: '150px',
      height: '150px',
      overflow: 'hidden',
    },
    img: {
      width: '100%'
    },
    imgNull: {
      opacity: .5,
      width: '70%'
    },
  })
);

export const PersonalDetail = (props) => {
  const classes = useStyles();
  const { i18n } = useTranslation();

  const { profile, handleEdit, fetchClusterGroup, clusterGroup  } = props;

  useEffect(() => {
    if (!clusterGroup) {
      fetchClusterGroup();
    }
  }, [clusterGroup]);

  return (
    <>
      {
        !props.hideEdit &&
        <div className="section-header mt-0">
          <h4 className="heading--card">{i18n.t('Personal Details')}</h4>
          <Button
            variant="contained"
            color="primary"
            disableElevation
            size="medium"
            className="btn"
            onClick={handleEdit}
          >
            {i18n.t('Edit')}
          </Button>
        </div>
      }

      <Card elevation={4}>
        <CardContent>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={`auto`} className="p-0">
              <div className={`${classes.image} flex-center`}>
                <img className={`${classes.img} + ${profile.imageSrc ? '' : classes.imgNull}`} src={profile.imageSrc ? profile.imageSrc : GENDER_CHOICES[profile.gender] === 'Male' ? patientMale : patientFemale} alt={profile.name} />
              </div>
            </Grid>
            <Grid item>
              <Typography variant="h4" color="primary">
                {profile.name}
              </Typography>
              <Typography variant="h6" color="textSecondary">
                {i18n.t(GENDER_CHOICES[profile.gender])}, {profile.year ? profile.year + ' ' + i18n.t('years') : ''} {profile.month ? profile.month + ' ' + i18n.t('months') : ''}
              </Typography>
              <Typography variant="h6" color="textSecondary">
                {i18n.t('Govt ID')}: {profile.govt_id}
              </Typography>
              <Typography variant="h6" color="textSecondary">
                {i18n.t('ICMR ID')}: {profile.icmr_id}
              </Typography>
              {profile.cluster_group && clusterGroup && 
                <Typography variant="h6" color="textSecondary">
                  {i18n.t('Cluster group')}: {clusterGroup.find(group => group.id == profile.cluster_group).name}
                </Typography>
              }
            </Grid>
            <Grid item xs={12} sm={3} className="ml-auto text-right">
              <Chip
                label={
                  patient_facility_status_choices.map(choice => {
                    return choice.id === parseInt(profile.patient_status) ? choice.name : ''
                  })
                }
                className={
                  patient_facility_status_choices.map(choice => {
                    return choice.id === parseInt(profile.patient_status) ? `${classes.chip} ${choice.theme} ` : ''
                  }).join(' ')
                }
              />
            </Grid>
          </Grid>
        </CardContent>
        <span></span>
      </Card>
    </>
  );
}

PersonalDetail.propTypes = {
  profile: PropTypes.object.isRequired,
  handleEdit: PropTypes.func,
  fetchClusterGroup: PropTypes.func
}

PersonalDetail.defaultProps = {
  profile: {}
}


const mapStateToProps = state => {
  const {  clusterGroup } = state;
  return {
      clusterGroup: clusterGroup.results
  };
};

export default connect(mapStateToProps, {fetchClusterGroup})(PersonalDetail);
