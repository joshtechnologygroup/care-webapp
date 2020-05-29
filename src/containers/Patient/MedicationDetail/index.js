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
import { PropTypes } from 'prop-types';
import CreateUpdateDoctor from './CreateUpdateDoctor';
import NullState from 'Components/NullState';
import Styles from './styles';

export default function MedicationDetail(props) {
  const theme = useTheme();
  const classes = Styles();
  const { i18n } = useTranslation();
  const belowTablet = useMediaQuery(theme.breakpoints.down('sm'));

  const { profile, handleEdit } = props;

  const [open, setOpen] = React.useState(false);
  const [doctorEditMode, setdoctorEditMode] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState({date: '', name: '', email: '', phone:''});
  const editRow = (row) => {
    if (row) {
      setSelectedRow(row);
      setdoctorEditMode(true);
    }
    else {
      setSelectedRow({date: '', name: '', email: '', phone:''});
      setdoctorEditMode(false);
    }
    setOpen(true);
  };
  // Handle modal close
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card elevation={4}>
      <CardHeader
        title={i18n.t('Medication Details')}
        action={
          <IconButton
            variant="contained"
            className={classes.action}
            aria-label="settings"
            onClick={handleEdit}
          >
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
          <Grid item xs={12}>
            <Typography variant="h5" color="primary" className="align-items-center">
              {i18n.t('Doctor / Attendant')}
              <IconButton
                variant="contained"
                className="ml-auto"
                aria-label="Add"
                onClick={() => editRow()}
              >
                <Add fontSize="large" label="Add" />
              </IconButton>
            </Typography>
            {
              profile.attendant.map((val, index) =>
              <Grid container spacing={4} key={index} className={`mt-0 ${classes.doctor} ${belowTablet ? 'py-20' : '' }`}>
                <Grid xs={10} sm={'auto'} item className={belowTablet ? 'py-0' : classes.dateWrap }>
                  <Chip variant="outlined" className={classes.date} label={moment.unix(val.date).format("DD-MMM-YYYY")} />
                </Grid>
                <Grid xs={10} sm={'auto'} item className={belowTablet ? 'py-0' : '' }>
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
                <Fab
                  size="small"
                  color="primary"
                  aria-label="edit"
                  className={classes.edit}
                  onClick={() => editRow(val)}
                >
                  <EditOutlined />
                </Fab>
              </Grid>
            )}
          </Grid>
        </Grid>
      </CardContent>
      {
        !profile.attendant.length &&
        <NullState msg={i18n.t('null_messages.doctor')} />
      }

      <CreateUpdateDoctor editMode={doctorEditMode} details={selectedRow} open={open} onClose={handleClose} />
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
