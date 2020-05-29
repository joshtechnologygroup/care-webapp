import React from 'react';
import { useTranslation } from "react-i18next";
import { useTheme } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {
  Card,
  CardHeader,
  Grid,
  CardContent,
  Typography,
  IconButton,
  Chip,
  Fab,
  Button
} from '@material-ui/core';
import moment from 'moment';
import { EditOutlined, MailOutline, PhoneOutlined, Add } from '@material-ui/icons';
import { MultiSelectChipsInput, SingleSelectChipsInput } from 'Components/Inputs';
import CreateUpdateDoctor from '../CreateUpdateDoctor';
import useStyles from '../styles';
import { PropTypes } from 'prop-types';
import NullState from 'Components/NullState';

// IMPORTING MOCK CHOICES
import { symptomChoices } from 'Mockdata/symptomChoices.json';
import { diseaseChoices } from 'Mockdata/diseaseChoices.json';
import { booleanStatuses } from 'Constants/app.const';
import { clinicalStatusChoices } from 'Mockdata/clinicalStatusChoices.json';

export default function Form(props) {
  const classes = useStyles();
  const { i18n } = useTranslation();
  const theme = useTheme();
  const belowTablet = useMediaQuery(theme.breakpoints.down('sm'));

  const {
    values: {
      covidStatus,
      clinicalStatus,
      symptoms,
      nonCovidDiseases,
      attendant,
    },
    handleSubmit,
    setFieldValue,
    editMode
  } = props;

  const setValue = (val, name) => {
    setFieldValue(name, val);
  };

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
  <form onSubmit={handleSubmit}>
    <Card elevation={4}>
      <CardHeader
        title={i18n.t('Contact Details')}
        action={
          editMode && 
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            disableElevation
            className="btn py-5 mt-5"
          >
            {i18n.t('Save')}
          </Button>
        }
      />
      <CardContent>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography variant="h5" color="primary" className="d-flex">
              {i18n.t('COVID-19 Status')}
            </Typography>
            <SingleSelectChipsInput
              value={covidStatus}
              options={booleanStatuses.positiveNegative}
              onChange={(val) => setValue(val, 'covidStatus')}
            />
          </Grid>

          <Grid item xs={12} className="pt-0">
            <Typography variant="h5" color="primary" className="d-flex">
              {i18n.t('Clinical Status')}
            </Typography>
            <SingleSelectChipsInput
              value={clinicalStatus}
              options={clinicalStatusChoices}
              onChange={(val) => setValue(val, 'clinicalStatus')}
            />
          </Grid>

          <Grid item xs={12} className="pt-0">
            <Typography variant="h5" color="primary" className="d-flex">
              {i18n.t('List of all COVID symptoms in the patient')}
            </Typography>
            <MultiSelectChipsInput
              options={symptomChoices}
              value={symptoms}
              onChange={(val) => setValue(val, 'symptoms')}
            />
          </Grid>

          <Grid item xs={12} className="pt-0">
            <Typography variant="h5" color="primary" className="d-flex">
              {i18n.t('List of all non-COVID disease in the patient')}
            </Typography>
            <MultiSelectChipsInput
              options={diseaseChoices}
              value={nonCovidDiseases}
              onChange={(val) => setValue(val, 'nonCovidDiseases')}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} className="mt-10">
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
            attendant.length > 0 && attendant.map((val, index) =>
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
          {
            !attendant.length &&
            <NullState message={i18n.t('null_messages.doctor')}></NullState>
          }
        </Grid>
      </CardContent>
      <CreateUpdateDoctor editMode={doctorEditMode} details={selectedRow} open={open} onClose={handleClose} />
    </Card>
  </form>
  );
}

Form.propTypes = {
  profile: PropTypes.object.isRequired,
  handleEdit: PropTypes.func
}

Form.defaultProps = {
  profile: {}
}
