import React, { useEffect } from 'react';
import { useTranslation } from "react-i18next";
import {
  Grid,
  Card,
  CardContent,
  Button,
  Typography,
} from '@material-ui/core';
import { EditOutlined, PhoneOutlined, RoomOutlined, HomeOutlined } from '@material-ui/icons';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { PropTypes } from 'prop-types';
import _ from 'underscore';
import { countryChoices, stateChoices, relationshipChoices } from 'Constants/app.const';
import { fetchContactDependencies } from 'Actions/PatientDetailsAction';
import { connect } from 'react-redux';
const useStyles = makeStyles(theme =>
  createStyles({
    icon: {
      fontSize: '2.2rem',
      marginRight: '4px',
      alignSelf: 'flex-start'
    }
  })
);

export const ContactDetail = (props) => {
  const classes = useStyles();
  const { i18n } = useTranslation();

  const { profile, handleEdit, districts, states, fetchContactDependencies } = props;

  useEffect(() => {
    if (!districts || !states) {
      fetchContactDependencies();
    }
  }, [districts, states]);
  return (
    <>
      <div className="section-header">
        <h4 className="heading--card">{i18n.t('Contact Details')}</h4>
        {
          !profile.length &&
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
        }
      </div>
      <Card elevation={4}>
        <CardContent>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={3} className="pb-0">
              <Typography variant="h6" color="primary" className="d-flex">
                <PhoneOutlined className={classes.icon} />
                {i18n.t('Phone number')}
              </Typography>
              <Typography variant="h6">
                {profile.phone_number} (
                {
                  relationshipChoices.map(choice => {
                    return choice.id === profile.phone_number_belongs_to ? (choice.name) : ''
                  })

                })
            </Typography>
            </Grid>
            <Grid item xs={12} sm={(profile.native_state || profile.native_country) ? 6 : 9} className="pb-0">
              <Typography variant="h6" color="primary" className="d-flex">
                <RoomOutlined className={classes.icon} />
                {i18n.t('Address')}
              </Typography>
              <Typography variant="h6">
                {profile.address}
              </Typography>
              <Typography variant="h6">
                {!_.isEmpty(districts) && profile.district && districts.find(group => group.id == profile.district).name}, {profile.city}
              </Typography>
              <Typography variant="h6">
                {!_.isEmpty(states) && profile.state &&
                  states.map(choice => {
                    return choice.id === profile.state ? (choice.name) : ''
                  })
                } - {profile.pincode}
              </Typography>
            </Grid>
            {
              (profile.native_state || profile.native_country) &&
              <Grid item xs={12} sm={3} className="pb-0">
                <Typography variant="h6" color="primary" className="d-flex">
                  <HomeOutlined className={classes.icon} />
                  {i18n.t('Native Place')}
                </Typography>
                <Typography variant="h6">
                  {states &&
                    states.map(choice => {
                      return choice.id === profile.nativeState ? (choice.name) : ''
                    })
                  }
                  {
                    countryChoices.map(choice => {
                      return choice.id === profile.nativeCountry ? (choice.name) : ''
                    })
                  }
                </Typography>
              </Grid>
            }
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}

ContactDetail.propTypes = {
  profile: PropTypes.object.isRequired,
  handleEdit: PropTypes.func,
  fetchContactDependencies:  PropTypes.func,
}

ContactDetail.defaultProps = {
  profile: {}
}

const mapStateToProps = state => {
  const { districts, states } = state;
  return {
    districts: districts.results,
    states: states.results,
  };
};

export default connect(mapStateToProps, { fetchContactDependencies })(ContactDetail);
