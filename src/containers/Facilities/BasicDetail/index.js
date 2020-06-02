import React from 'react';
import { useTranslation } from "react-i18next";
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Typography,
} from '@material-ui/core';
import { EditOutlined, RoomOutlined } from '@material-ui/icons';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { PropTypes } from 'prop-types';

// IMORTING MOCKCHOICES
import { stateChoices } from 'Mockdata/stateChoices.json';

const useStyles = makeStyles(theme =>
  createStyles({
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

export default function BasicDetail(props) {
  const classes = useStyles();
  const { i18n } = useTranslation();

  const { profile, handleEdit } = props;
  return (
    <Card elevation={4}>
      <CardHeader
        title={i18n.t('Contact Details')}
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
              {i18n.t('Ownership Type')}: {profile.owned_by}
              </Typography>
              <Typography variant="h6" color="textSecondary">
                {i18n.t('Facility Type')}: {profile.facility_type}
              </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" color="primary" className="d-flex">
              <RoomOutlined className={classes.icon} />
              {i18n.t('Address')}
            </Typography>
            <Typography variant="h6">
              {profile.address}, {profile.local_body}
            </Typography>
            <Typography variant="h6">
              {profile.district}, {profile.city}
            </Typography>
            <Typography variant="h6">
              {profile.state} - {profile.pincode}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

BasicDetail.propTypes = {
  profile: PropTypes.object.isRequired,
  handleEdit: PropTypes.func
}

BasicDetail.defaultProps = {
  profile: {}
}
