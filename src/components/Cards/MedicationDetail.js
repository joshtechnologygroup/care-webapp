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
import { EditOutlined, MailOutline, PhoneOutlined, Add } from '@material-ui/icons';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { PropTypes } from 'prop-types';

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

export default function MedicationDetail(props) {
  const theme = useTheme();
  const classes = useStyles();
  const { i18n } = useTranslation();
  const belowTablet = useMediaQuery(theme.breakpoints.down('sm'));

  const { profile, handleEdit } = props;
  return (
    <Card elevation={4}>
      <CardHeader
        title={i18n.t('Medication Details')}
        action={
          <IconButton variant="contained" className={classes.action} aria-label="settings" onClick={handleEdit}>
            <EditOutlined fontSize="large"/>
          </IconButton>
        }
      />
      <CardContent>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <Typography variant="h5" color="primary" className="d-flex">
              {i18n.t('COVID-19 Status')}
            </Typography>
              <Chip label={profile.covidStatus} className={`mt-5 + ${profile.covidStatus === 'Positive'? 'danger' : 'success'}`} />
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
          <Grid item xs={12}>
            <Typography variant="h5" color="primary" className="align-items-center">
              {i18n.t('Doctor / Attendant')}
              <IconButton variant="contained" className="ml-auto" aria-label="settings">
                <Add fontSize="large" label="Add" />
              </IconButton>
            </Typography>
            {
              profile.attendant.map((val, index) =>
              <Grid container spacing={4} key={index} className={`mt-10 ${classes.doctor} ${belowTablet ? 'py-20' : '' }`}>
                <Grid xs={12} sm={'auto'} item className={belowTablet ? 'py-0' : classes.dateWrap }>
                  <Chip variant="outlined" className={classes.date} label={moment.unix(val.date).format("DD-MMM-YYYY")} />
                </Grid>
                <Grid xs={12} sm={'auto'} item className={belowTablet ? 'py-0' : '' }>
                  <Typography className="mt-4" variant="h5" color="primary">{val.name}</Typography>
                  {
                    Boolean(val.email) &&
                    <Typography variant="h6" className="align-items-center"><MailOutline className="mr-5" />{val.email}</Typography>
                  }
                  {
                    Boolean(val.phone) &&
                    <Typography variant="h6" className="align-items-center"><PhoneOutlined className="mr-5" />{val.phone}</Typography>
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

MedicationDetail.propTypes = {
  profile: PropTypes.object.isRequired,
  handleEdit: PropTypes.func
}

MedicationDetail.defaultProps = {
  profile: {}
}
