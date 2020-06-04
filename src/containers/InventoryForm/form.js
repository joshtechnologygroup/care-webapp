import React, {useState, useEffect} from 'react';
import { useTranslation } from "react-i18next";
import {
    Grid,
    TextField

} from '@material-ui/core';
import { PropTypes } from 'prop-types';
import Select from 'react-select'
import useStyles from './styles';
import { connect } from 'react-redux';
import _ from 'underscore'
export function Form(props) {
    const classes = useStyles();
    const { i18n } = useTranslation();
    const {data, updateData, handleChange} = props;
    const [errors, setErrors] = useState({ required_quantity: false, current_quantity: false, form: ''})

    const facilityName = []; 
    const inventoryType = [];

    if(updateData){
        facilityName.push({
            'value': `facility-type-0`,
            'label': updateData.facility
        })
        inventoryType.push({
            'value': `inventory-name-0`,
            'label': updateData.item
        })
    } else {
        facilityName.push({
            'value': `facility-name--`,
            'label': '---------------'
        })
        inventoryType.push({
            'value': `inventory-name--`,
            'label': '----------------'
        })
    if(!_.isEmpty(props.shortFacilities)){
        Object.keys(props.shortFacilities).forEach((facility, index) =>{
            facilityName.push({
                'value': `facility-type-${index}`,
                'label': props.shortFacilities[facility].name
            })
        }) 
    }

    if(!_.isEmpty(props.inventoryTypesList)){
        Object.keys(props.inventoryTypesList).forEach((inventoryitem, index) =>{
            inventoryType.push({
                'value': `inventory-type-${index}`,
                'label': props.inventoryTypesList[inventoryitem].name
            })
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
            default: break;
          }
          setErrors(prevState =>({
              ...prevState,
             ...errors
          }))
        handleChange(name, e.target.value);
    };

    useEffect(() => {
        if(props.facilityList && !_.isEmpty(props.facilityList) && props.inventoryTypesList && !_.isEmpty(props.inventoryTypesList)){
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
                        isDisabled={updateData?true:false}
                    />
                </Grid>

                <Grid item sm={6} xs={12}>
                    <label className={classes.label}>{i18n.t('Inventory Type')}</label>
                    <Select
                        options={inventoryType}
                        defaultValue={inventoryType[0]}
                        onChange={change.bind(null, "type")}
                        isDisabled={updateData?true:false}
                    />
                </Grid>
                <Grid item sm={6} xs={12}>
                    <TextField 
                        name="required_quantity"
                        type="number"
                        label={i18n.t('Required Number')}
                        fullWidth
                        onChange={changeText.bind(null, "required_quantity")}
                        error={errors.required_quantity}
                    />
                </Grid>
                <Grid item sm={6} xs={12}>
                    <TextField 
                        name="current_quantity"
                        type="number"
                        label={i18n.t('Current Number')}
                        fullWidth
                        onChange={changeText.bind(null, "current_quantity")}
                        error={errors.current_quantity}
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
    inventoryList:state.inventory.results,
    inventoryTypesList: state.inventoryTypes,
    shortFacilities: {...state.shortFacilities.results},
    count:state.inventory.count
  });
  
Form.propTypes = {
    profile: PropTypes.object.isRequired,
    inventoryList: PropTypes.array.isRequired,
    inventoryTypesList: PropTypes.array.isRequired,
    shortFacilities: PropTypes.array.isRequired,
    handleEdit: PropTypes.func.isRequired
};
  
  export default connect(mapStateToProps, null)(Form);
