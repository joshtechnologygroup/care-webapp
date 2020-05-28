import React, {useEffect} from 'react';
import { useTranslation } from "react-i18next";
import {
    Grid,
    TextField

} from '@material-ui/core';
import { PropTypes } from 'prop-types';
import Select from 'react-select'
import useStyles from './styles';
import { connect } from 'react-redux';
export function Form(props) {
    const classes = useStyles();
    const { i18n } = useTranslation();
    const {data, handleChange} = props;

    let facilityName = []; 
    let facilityType = [];

    props.facilityList.forEach((facility, index) => 
    facilityName.push({
            'value': `facility-${index}`,
            'label': facility.name
        })
    );

    props.inventoryTypesList.forEach((inventoryType, index) => 
    facilityType.push({
            'value': `facility-type-${index}`,
            'label': inventoryType.name
        })
    );

    const change = (name, e) => {
        handleChange(name, e);
    };
     const changeText = (name, e) => {
        handleChange(name, e.target.value);
    };

    useEffect(() => {
        console.log('data in edit mode', data);
        handleChange({"name": facilityName[0], "type": facilityType[0]}); // Setting initial state
    }, []);

    return (
        <form>
            <Grid item container spacing={2}>
                <Grid item sm={6} xs={12}>
                    <label className={classes.label}>{i18n.t('Facility Name')}</label>
                    <Select
                        options={facilityName}
                        defaultValue={facilityName[0]}
                        onChange={change.bind(null, "name")}
                    />
                </Grid>

                <Grid item sm={6} xs={12}>
                    <label className={classes.label}>{i18n.t('Facility Type')}</label>
                    <Select
                        options={facilityType}
                        defaultValue={facilityType[0]}
                        onChange={change.bind(null, "type")}
                    />
                </Grid>
                <Grid item sm={6} xs={12}>
                    <TextField 
                        name="required_quantity"
                        type="number"
                        label={i18n.t('Required Number')}
                        fullWidth
                        onChange={changeText.bind(null, "required_quantity")}
                    />
                </Grid>
                <Grid item sm={6} xs={12}>
                    <TextField 
                        name="current_quantity"
                        type="number"
                        label={i18n.t('Current Number')}
                        fullWidth
                        onChange={changeText.bind(null, "current_quantity")}
                    />
                </Grid>
            </Grid>
        </form>
    );
}

// Form.propTypes = {
//     profile: PropTypes.object.isRequired,
//     handleEdit: PropTypes.func
// }

Form.defaultProps = {
    profile: {}
}

const mapStateToProps = (state) => ({
    inventoryList:state.inventory.results,
    inventoryTypesList: state.inventoryTypes.results,
    facilityList: state.facilities.results,
    count:state.inventory.count
  });
  
Form.propTypes = {
    profile: PropTypes.object.isRequired,
    inventoryList: PropTypes.array.isRequired,
    inventoryTypesList: PropTypes.array.isRequired,
    facilityList: PropTypes.array.isRequired,
    handleEdit: PropTypes.func.isRequired
};
  
  export default connect(mapStateToProps, null)(Form);
