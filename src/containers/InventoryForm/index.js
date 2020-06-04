import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import CustomModal from 'Components/CustomModal';
import { useTranslation } from "react-i18next";
import { Formik } from 'formik';
import Form from './form';
import useStyles from './styles';
import { createOrUpdateInventory } from 'Actions/FacilitiesAction';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import _ from 'underscore'

export const InventoryForm = (props) => {
    const classes = useStyles();
    const [inventoryData, setInventoryData] = useState({});
    const [isAddAnother, setIsAddAnother] = useState(false);
    const [error, setError] = useState(false)
    const { open, data, onClose, createOrUpdateInventory, facilityList, inventoryTypesList, index } = props;
    const [errors, setErrors] = useState({ required_quantity: true, current_quantity: true, form: '' })

    const addAnother = (event) => {
        setIsAddAnother(event.target.checked)
    }

    useEffect(() => {
        if (!facilityList && _.isEmpty(facilityList) && !inventoryTypesList && _.isEmpty(inventoryTypesList)) {
            setError(true)
        }
        else {
            setError(false)
        }
    }, [facilityList, inventoryTypesList]);

    const createInventory = () => {
        let initial = inventoryData;
        console.log(facilityList);
        if (!_.isEmpty(facilityList) && !_.isEmpty(inventoryTypesList)) {
            if (initial && !data) {
                Object.keys(facilityList).forEach((facility, index) => {
                    if (initial.name.label === facilityList[facility].name) {
                        initial['facility'] = facilityList[facility].id
                        return;
                    }
                });
                Object.keys(inventoryTypesList).forEach((inventoryitem, index) => {
                    if (initial.type.label === inventoryTypesList[inventoryitem].name) {
                        initial['item'] = inventoryTypesList[inventoryitem].id
                        return;
                    }
                });
            }
            delete initial.name;
            delete initial.type;
            setInventoryData({ inventoryData: initial });
            if (isAddAnother === false && data) {
                createOrUpdateInventory(initial, data.id)
            } else {
                createOrUpdateInventory(initial)
            }
        }
        if (!isAddAnother) {
            onClose();
        }
    }

    const handleChange = (name, e) => {
        if (typeof name === 'object') {
            setInventoryData({ ...inventoryData, ...name });
        } else {
            setInventoryData({ ...inventoryData, [name]: e });
        }
        switch (name) {
            case 'required_quantity':
                errors.required_quantity = e ? false : true;
                break;
            case 'current_quantity':
                errors.current_quantity = e ? false : true;
                break;
            default: break;
        }
        setErrors(prevState => ({
            ...prevState,
            ...errors
        }))
    }

    const { i18n } = useTranslation();

    return (
        <CustomModal open={open} onClose={onClose} title={i18n.t('Inventory')}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Formik>
                        {
                            props => <Form data={inventoryData} updateData={data}  {...props} handleChange={handleChange} />
                        }
                    </Formik>
                </Grid>
                <Grid item xs={12}>
                    {
                        error === true &&
                        <FormControl component="fieldset" error={true}>
                            <FormHelperText className={classes.error}>Facility Name and Inventory Type not exists...</FormHelperText>
                        </FormControl>
                    }
                </Grid>
                <Grid item xs={12}>
                    {!data &&
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
                        onClick={createInventory}
                        disabled={errors.required_quantity || errors.current_quantity}
                    >
                        {i18n.t('Ok')}
                    </Button>
                </Grid>
            </Grid>
        </CustomModal>
    );
}


const mapStateToProps = (state) => {
    const { inventory, inventoryTypes, shortFacilities } = state;
    return {
        inventoryList: inventory.results,
        inventoryTypesList: inventoryTypes,
        facilityList: {...shortFacilities.results},
        count: state.inventory.count
    };
};

InventoryForm.propTypes = {
    inventoryList: PropTypes.array.isRequired,
    inventoryTypesList: PropTypes.array.isRequired,
    facilityList: PropTypes.array.isRequired,
    createOrUpdateInventory: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { createOrUpdateInventory })(InventoryForm);
