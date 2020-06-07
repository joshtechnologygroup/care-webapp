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
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';

export function Form(props) {
  const classes = useStyles();
  const {i18n} = useTranslation();
  const {
      data, 
      updateData, 
      handleChange, 
      editMode,
      addAnother, 
      isAddAnother, 
      handleSubmit, 
      setFieldTouched, 
      setFieldValue,
      errors,
      touched,
      facilityName,
      inventoryType,
      values
    } = props;

  const change = (name, e) => {
      setFieldTouched(name, e.target.value);
      setFieldValue(name, e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid item container spacing={2}>
        <Grid item sm={6} xs={12}>
          <label className={classes.label}>{i18n.t('Facility Name')}</label>
          <Select
            className={`${touched.facility && Boolean(errors.facility) && 'react-select__error'}`}
            options={facilityName}
            value={facilityName.find(item => item.value === values.facility) || values.facility}
            onChange={(val) => {
                setFieldTouched("facility");
                setFieldValue("facility", val.value);
            }}
            isDisabled={updateData ? true : false}
          />
          {
              touched.facility && errors.facility && 
              <p className="text--error">{errors.facility}</p>
            }
        </Grid>

        <Grid item sm={6} xs={12}>
          <label className={classes.label}>{i18n.t('Inventory Type')}</label>
          <Select
            className={`${touched.item && Boolean(errors.item) && 'react-select__error'}`}
            options={inventoryType}
            value={inventoryType.find(item => item.value === values.item) || values.item}
            onChange={(val) => {
                setFieldTouched("item")
                setFieldValue("item", val.value);
            }}
            isDisabled={updateData ? true : false}
          />
          {
              touched.item && errors.item && 
              <p className="text--error">{errors.item}</p>
            }
        </Grid>
        <Grid item sm={6} xs={12}>
          <label className={classes.label}>{i18n.t('Required Number')}</label>
          <TextField
            name="required_quantity"
            type="number"
            variant="outlined"
            fullWidth
            value={values.required_quantity}
            onChange={change.bind(null, "required_quantity")}
            error={touched.required_quantity && errors.required_quantity}
            helperText={touched.required_quantity && errors.required_quantity}
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
            value={values.current_quantity}
            onChange={change.bind(null, "current_quantity")}
            error={touched.current_quantity && errors.current_quantity}
            helperText={touched.current_quantity && errors.current_quantity}
            className={classes.field}
          />
        </Grid>
        <Grid item xs={12}>
            {
                !editMode && 
                <FormControlLabel
                    value="end"
                    control={<Switch checked={isAddAnother} onChange={addAnother} color="primary" />}
                    label="Add Another"
                    labelPlacement="end"
                />
            }
            <Button
                className={classes.button}
                variant="contained"
                color="primary"
                size="medium"
                type="submit"
                disabled={Boolean(errors.length)}
            >
                {i18n.t('Ok')}
            </Button>
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
