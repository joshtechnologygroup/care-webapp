import React, {useState, useEffect} from 'react';
import {useTranslation} from "react-i18next";
import {
  Grid,
  TextField

} from '@material-ui/core';
import {PropTypes} from 'prop-types';
import Select from 'react-select'
import useStyles from './styles';
import {connect} from 'react-redux';
import _ from 'underscore'

export function Form(props) {
  const classes = useStyles();
  const {i18n} = useTranslation();
  const {data, updateData, handleChange} = props;
  const [errors, setErrors] = useState({total_bed: false, occupied_bed: false, available_bed: false, form: ''})

  const change = (name, value) => handleChange(name, value);

  const changeText = (name, e) => {
    if(typeof name !== 'object'){
      errors[name] = !(e.target.value && parseInt(e.target.value) >= 0);
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
            options={props.facilityOptions}
            defaultValue={props.facilityOptions[0]}
            onChange={change.bind(null, "facility")}
          />
        </Grid>

        <Grid item sm={6} xs={12}>
          <label className={classes.label}>{i18n.t('Room Type')}</label>
          <Select
            options={props.roomOptions}
            defaultValue={props.roomOptions[0]}
            onChange={change.bind(null, "room_type")}
          />
        </Grid>

        <Grid item sm={6} xs={12}>
          <label className={classes.label}>{i18n.t('Bed Type')}</label>
          <Select
            options={props.bedOptions}
            defaultValue={props.bedOptions[0]}
            onChange={change.bind(null, "bed_type")}
          />
        </Grid>

        <Grid item sm={6} xs={12}>
          <TextField
            name="total_beds"
            type="number"
            label={i18n.t('Total beds')}
            fullWidth
            onChange={changeText.bind(null, "total_bed")}
            error={errors.total_bed}
          />
        </Grid>

        <Grid item sm={6} xs={12}>
          <TextField
            name="occupied_beds"
            type="number"
            label={i18n.t('Occupied beds')}
            fullWidth
            onChange={changeText.bind(null, "occupied_bed")}
            error={errors.occupied_bed}
          />
        </Grid>

        <Grid item sm={6} xs={12}>
          <TextField
            name="available_beds"
            type="number"
            label={i18n.t('Available beds')}
            fullWidth
            onChange={changeText.bind(null, "available_bed")}
            error={errors.available_bed}
          />
        </Grid>
      </Grid>
    </form>
  );
}


Form.defaultProps = {
  profile: {}
}

const mapStateToProps = (state) => ({
  inventoryList: state.inventory.results,
  inventoryTypesList: state.inventoryTypes,
  count: state.inventory.count
});

Form.propTypes = {
  profile: PropTypes.object.isRequired,
  inventoryList: PropTypes.array.isRequired,
  inventoryTypesList: PropTypes.array.isRequired,
  handleEdit: PropTypes.func.isRequired
};

export default connect(mapStateToProps, null)(Form);
