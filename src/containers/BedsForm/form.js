import React, {useState, useEffect} from 'react';
import {useTranslation} from "react-i18next";
import {
  Grid,
  TextField
} from '@material-ui/core';
import useStyles from './styles';
import {connect} from 'react-redux';
import Select from "react-select";

export function Form(props) {
  const classes = useStyles();
  const {i18n} = useTranslation();
  const {data, handleChange} = props;
  const [errors, setErrors] = useState({total_bed: false, occupied_bed: false, available_bed: false, form: ''})

  const change = (name, value) => {
    handleChange(name, value);
  };
  const changeText = (name, e) => {
    switch (name) {
      case 'total_beds':
        errors.total_bed = e.target.value && (parseInt(e.target.value) >= 0) ? false : true;
        break;
      case 'occupied_beds':
        errors.occupied_bed = e.target.value && (parseInt(e.target.value) >= 0) ? false : true;
        break;
      case 'available_bed':
        errors.available_bed = e.target.value && (parseInt(e.target.value) >= 0) ? false : true;
        break;
      default:
        break;
    }
    setErrors(prevState => ({
      ...prevState,
      ...errors
    }))
    handleChange(name, e.target.value);
  };

  return (
    <form>
      <Grid item container spacing={2}>
        <Grid item sm={6} xs={12}>
          <label className={classes.label}>{i18n.t('Facility Name')}</label>
          <Select
            defaultValue={[{'label': data.facility}]}
            onChange={change.bind(null, "facility")}
            isDisabled={true}
          />
        </Grid>

        <Grid item sm={6} xs={12}>
          <label className={classes.label}>{i18n.t('Room Type')}</label>
          <Select
            defaultValue={[{'label': data.room_type}]}
            onChange={change.bind(null, "room_type")}
            isDisabled={true}
          />
        </Grid>

        <Grid item sm={6} xs={12}>
          <label className={classes.label}>{i18n.t('Bed Type')}</label>
          <Select
            defaultValue={[{'label': data.bed_type}]}
            onChange={change.bind(null, "bed_type")}
            isDisabled={true}
          />
        </Grid>

        <Grid item sm={6} xs={12}>
          <label className={classes.label}>{i18n.t('Total beds')}</label>
          <TextField
            name="total_beds"
            className={classes.field}
            variant="outlined"
            type="number"
            defaultValue={data.total_bed}
            fullWidth
            onChange={changeText.bind(null, "total_beds")}
            error={errors.total_bed}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <label className={classes.label}>{i18n.t('Occupied beds')}</label>
          <TextField
            name="occupied_beds"
            variant="outlined"
            className={classes.field}
            type="number"
            defaultValue={data.occupied_bed}
            fullWidth
            onChange={changeText.bind(null, "occupied_beds")}
            error={errors.occupied_bed}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <label className={classes.label}>{i18n.t('Available beds')}</label>
          <TextField
            name="available_bed"
            variant="outlined"
            className={classes.field}
            type="number"
            defaultValue={data.available_bed}
            fullWidth
            onChange={changeText.bind(null, "available_bed")}
            error={errors.available_bed}
          />
        </Grid>
      </Grid>
    </form>
  );
}


const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, null)(Form);
