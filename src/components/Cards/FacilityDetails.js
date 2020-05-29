import React from 'react';
import { useTranslation } from "react-i18next";
import { useTheme } from '@material-ui/core';
import moment from 'moment';
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Typography,
  Chip,
  Fab,
} from '@material-ui/core';
import { EditOutlined, Add } from '@material-ui/icons';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { PropTypes } from 'prop-types';

// IMPORTING MOCK CHOICES
import { facilityStatusChoices } from 'Mockdata/facilityStatusChoices.json';

const useStyles = makeStyles(theme =>
  createStyles({
    edit: {
      transform: 'scale(0)',
      transition: '.2s',
      width: 0,
      boxShadow: 'none',
      alignSelf: 'center',
      marginLeft: 'auto',
    },
    action: {
      position: 'absolute',
      right: '.2em',
      top: '.2em',
    },
    doctor: {
      transition: '.4s',
      '&:hover': {
        background: theme.palette.gray.tint,
        '& .MuiFab-root': {
          marginRight: theme.typography.pxToRem(20),
          transform: 'scale(1)',
          width: '40px',
        },
      },
    },
    dateWrap: {
      zIndex: 1,
      position: 'relative',
      '&:before': {
        content: '""',
        position: 'absolute',
        width: '2px',
        height: '100%',
        background: theme.palette.gray.lighter,
        left: '50%',
        zIndex: 0,
        top: 0,
      },
    },
    date: {
      background: theme.palette.gray.lighter,
      color: theme.palette.primary.main,
      position: 'relative',
      zIndex: 1,
      border: 0,
      fontWeight: 'bold'
    },
  })
);

export default function FacilityDetails(props) {
  const theme = useTheme();
  const classes = useStyles();
  const { i18n } = useTranslation();
  const belowTablet = useMediaQuery(theme.breakpoints.down('sm'));

  const { profile, handleEdit } = props;
  return (
    <Card elevation={4}>
      <CardHeader
        title={i18n.t('Facility Details')}
        action={
          <IconButton variant="contained" className={classes.action} aria-label="add"
            >
            <Add fontSize="large" label="Add" />
          </IconButton>
        }
      />
      <CardContent>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            {
              profile.map((val, index) =>
              <Grid container spacing={4} key={index} className={`mt-10 ${classes.doctor} ${belowTablet ? 'py-20' : '' }`}>
                <Grid xs={12} sm={'auto'} item className={belowTablet ? 'py-0' : classes.dateWrap }>
                  <Chip variant="outlined" className={classes.date} label={moment.unix(val.admittedDateTime).format("DD-MMM-YYYY HH:MM A")} />
                </Grid>
                <Grid xs={12} sm={'auto'} item className={belowTablet ? 'py-0' : '' }>
                  <Typography className="mt-4" variant="h5" color="primary">{val.facilityName}</Typography>
                  <Typography variant="h6">
                    <Typography variant="inherit" color="primary">{i18n.t('Facility ID')}: </Typography>
                    {val.facilityId}
                  </Typography>
                  <Typography variant="h6">
                    <Typography variant="inherit" color="primary">{i18n.t('Facility Address')}: </Typography>
                    {val.type}
                  </Typography>
                  <Typography variant="h6">
                    <Typography variant="inherit" color="primary">{i18n.t('Facility type')}: </Typography>
                    {val.type}
                  </Typography>
                  <Typography variant="h6">
                    <Typography variant="inherit" color="primary">{i18n.t('Facility ownership')}: </Typography>
                    {val.ownershipType}
                  </Typography>
                  <Typography variant="h6">
                    <Typography variant="inherit" color="primary">{i18n.t('Status')}: </Typography>
                    {
                      facilityStatusChoices.map(choice => {
                        return choice.id === val.status ? (choice.name) : ''
                      })
                    }
                  </Typography>
                  {
                    Boolean(val.dischargedDateTime) &&
                    <Typography variant="h6" className="align-items-center">
                      <Typography variant="inherit" color="primary">{i18n.t('Discharged on')}: </Typography>
                      {moment.unix(val.dischargedDateTime).format("DD-MMM-YYYY HH:MM A")}
                    </Typography>
                  }
                </Grid>
                <Fab size="small" color="primary" aria-label="edit" className={classes.edit}>
                  <EditOutlined />
                </Fab>
              </Grid>
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

FacilityDetails.propTypes = {
  profile: PropTypes.array.isRequired,
  handleEdit: PropTypes.func
}

FacilityDetails.defaultProps = {
  profile: []
}
