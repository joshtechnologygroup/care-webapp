import React, {useState, useEffect} from 'react';
import {useTranslation} from "react-i18next";
import {
  Grid,
  TextField
} from '@material-ui/core';
import * as Constants from 'Src/constants';
import {PropTypes} from 'prop-types';
import Select from 'react-select'
import useStyles from './styles';
import {connect} from 'react-redux';
import _ from 'underscore';
import * as utils from 'Src/utils/utils';

export function Form(props) {
  const classes = useStyles();
  const {i18n} = useTranslation();
  const {data, updateData, handleChange} = props;
  const [errors, setErrors] = useState({required_quantity: false, current_quantity: false, form: ''})

  const facilityName = [];
  const inventoryType = [];

  if (updateData) {
    facilityName.push(utils.dropDownDict(updateData.facility, `facility-type-0`));
    inventoryType.push(utils.dropDownDict(updateData.item, `inventory-name-0`))
  } else {
    facilityName.push(utils.dropDownDict(Constants.FACILITY_DEFAULT, `facility-name--`));
    inventoryType.push(utils.dropDownDict(Constants.FACILITY_DEFAULT, `inventory-name--`));
    if (props.userType !== Constants.FACILITY_MANAGER && !_.isEmpty(props.shortFacilities)) {
      Object.keys(props.shortFacilities).forEach((facility, index) => {
        facilityName.push(utils.dropDownDict(props.shortFacilities[facility].name, `facility-type-${index}`));
      })
    }
    if (props.userType === Constants.FACILITY_MANAGER && props.associatedFacilities && props.shortFacilities) {
      props.associatedFacilities.forEach((id) => {
        Object.keys(props.shortFacilities).forEach((facility, index) => {
          if (props.shortFacilities[facility].id === id) {
            facilityName.push(utils.dropDownDict(props.shortFacilities[facility].name, `facility-type-${index}`));
          }
        });
      });
    }

    if (!_.isEmpty(props.inventoryTypesList)) {
      Object.keys(props.inventoryTypesList).forEach((inventoryitem, index) => {
        inventoryType.push(utils.dropDownDict(props.inventoryTypesList[inventoryitem].name, `inventory-type-${index}`));
      })
    }
  }
  const change = (name, value) => {
    handleChange(name, value);
  };
  const changeText = (name, e) => {
    switch (name) {
      case 'required_quantity':
        errors.required_quantity = e.target.value ? false : true;
        break;
      case 'current_quantity':
        errors.current_quantity = e.target.value ? false : true;
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

  useEffect(() => {
    if (props.facilityList && !_.isEmpty(props.facilityList) && props.inventoryTypesList && !_.isEmpty(props.inventoryTypesList)) {
      handleChange({"name": facilityName[0], "type": inventoryType[0]}); // Setting initial state
    }
  }, [errors]);

  return (
    <form>
      <Grid item container spacing={2}>
        <Grid item sm={6} xs={12}>
          <label className={classes.label}>{i18n.t('Facility Name')}</label>
          <Select
            options={facilityName}
            defaultValue={facilityName[0]}
            onChange={change.bind(null, "name")}
            isDisabled={updateData ? true : false}
          />
        </Grid>

        <Grid item sm={6} xs={12}>
          <label className={classes.label}>{i18n.t('Inventory Type')}</label>
          <Select
            options={inventoryType}
            defaultValue={inventoryType[0]}
            onChange={change.bind(null, "type")}
            isDisabled={updateData ? true : false}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <label className={classes.label}>{i18n.t('Required Number')}</label>
          <TextField
            name="required_quantity"
            type="number"
            variant="outlined"
            fullWidth
            onChange={changeText.bind(null, "required_quantity")}
            error={errors.required_quantity}
            className={classes.field}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <label className={classes.label}>{i18n.t('Current Number')}</label>
          <TextField
            name="current_quantity"
            type="number"
            variant="outlined"
            fullWidth
            onChange={changeText.bind(null, "current_quantity")}
            error={errors.current_quantity}
            className={classes.field}
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
  shortFacilities: {...state.shortFacilities.results},
  count: state.inventory.count,
  userType: state.profile.user_type,
  associatedFacilities: state.profile.associated_facilities,
});

Form.propTypes = {
  associatedFacilities: PropTypes.array,
  userType: PropTypes.number,
  profile: PropTypes.object,
  inventoryList: PropTypes.array,
  inventoryTypesList: PropTypes.array,
  shortFacilities: PropTypes.array,
  handleEdit: PropTypes.func
};

export default connect(mapStateToProps, null)(Form);
