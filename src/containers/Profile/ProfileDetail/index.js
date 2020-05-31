import React from 'react';
import { useTranslation } from "react-i18next";
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Typography,
  Chip
} from '@material-ui/core';
import { EditOutlined, RoomOutlined } from '@material-ui/icons';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { PropTypes } from 'prop-types';

// IMORTING MOCKCHOICES
import { stateChoices } from 'Mockdata/stateChoices.json';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      borderRadius: '0',
      boxShadow: '0.2rem 0.2rem 0.3rem 0.2rem rgba(0, 0, 0, 0.07)',
      position: 'relative',
      marginBottom: '16px'
    },
    action: {
      position: 'absolute',
      right: 0,
      top: 0
    },
    icon: {
      fontSize: '2.2rem',
      marginRight: '4px',
      alignSelf: 'flex-start'
    }
  })
);

export default function ProfileDetail(props) {
  const classes = useStyles();
  const { i18n } = useTranslation();

  const { profile, handleEdit } = props;
  return (
    <Card className={classes.root} elevation={4}>
      <CardHeader
        title={i18n.t('Profile Details')}
        action={
          <IconButton variant="contained" className={classes.action} aria-label="settings" onClick={handleEdit}>
            <EditOutlined fontSize="large"/>
          </IconButton>
        }
      />
      <CardContent>
        <Grid container spacing={2} alignItems="flex-start">
          <Grid item sm={6}>
            <Typography variant="h4" color="primary">
              {profile.name}
            </Typography>
            <Typography variant="h6" color="textSecondary">
              {profile.role}
            </Typography>
            <Typography variant="h6" color="textSecondary">
              {i18n.t('Email')}: {profile.email}
            </Typography>
            <Typography variant="h6" color="textSecondary">
              {i18n.t('Phone')}: {profile.phone}
            </Typography>
          </Grid>
          <Grid item sm={6}>
            <Typography variant="h6" color="textSecondary">
              {i18n.t('District Preference')}:
            </Typography>
            <Grid container spacing={1}>
              {
                profile.districtPreference.map((item) => (
                  <Grid item><Chip variant="outlined" size="small" label={item.label} color="primary" /></Grid>
                ))
              }
            </Grid>
            <Typography className="mt-15" variant="h6" color="textSecondary">
              {i18n.t('Associated Facilities')}:
            </Typography>
            <Grid container spacing={1}>
              {
                profile.associatedFacilites.map((item) => (
                  <Grid item><Chip variant="outlined" size="small" label={item.label} color="primary" /></Grid>
                ))
              }
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

ProfileDetail.propTypes = {
  profile: PropTypes.object.isRequired,
  handleEdit: PropTypes.func
}

ProfileDetail.defaultProps = {
  profile: {}
}
