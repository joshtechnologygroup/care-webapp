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
import { createInventories, updateInventories } from 'Actions/InventoriesAction';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import _ from 'underscore';
import { createToastNotification } from 'Actions/ToastAction';
import * as ToastUtils from 'Src/utils/toast';
import { SUCCESS, DANGER } from "Src/constants";
import * as Yup from 'yup';
import * as utils from 'Src/utils/utils';
import * as Constants from 'Src/constants';

export const InventoryForm = (props) => {
    const classes = useStyles();
    const { i18n } = useTranslation();
    const [inventoryData, setInventoryData] = useState({});
    const [isAddAnother, setIsAddAnother] = useState(false);
    const [error, setError] = useState(false)
    const { open, data, onClose, createInventories, updateInventories, facilityList, inventoryTypesList, index, editMode } = props;
    const [errors, setErrors] = useState({ required_quantity: true, current_quantity: true, form: '' })

    const addAnother = (event) => {
        setIsAddAnother(event.target.checked)
    }

    // useEffect(() => {
    //     if (!facilityList && _.isEmpty(facilityList) && !inventoryTypesList && _.isEmpty(inventoryTypesList)) {
    //         setError(true)
    //     }
    //     else {
    //         setError(false)
    //     }
    // }, [facilityList, inventoryTypesList]);

    const facilityName = [];
    const inventoryType = [];
    if (props.userType !== Constants.FACILITY_MANAGER && !_.isEmpty(props.facilityList)) {
        Object.keys(props.facilityList).forEach((facility, index) => {
        facilityName.push(utils.dropDownDict(props.facilityList[facility].name, props.facilityList[facility].id));
        })
    }

    if (props.userType === Constants.FACILITY_MANAGER && props.associatedFacilities && props.facilityList) {
        props.associatedFacilities.forEach((id) => {
        Object.keys(props.facilityList).forEach((facility, index) => {
            if (props.shorfacilityListtFacilities[facility].id === id) {
            facilityName.push(utils.dropDownDict(props.facilityList[facility].name, props.facilityList[facility]));
            }
        });
        });
        }

        if (!_.isEmpty(props.inventoryTypesList)) {
            Object.keys(props.inventoryTypesList).forEach((inventoryitem, index) => {
            inventoryType.push(utils.dropDownDict(props.inventoryTypesList[inventoryitem].name, props.inventoryTypesList[inventoryitem].id));
            })
        }


    const validationSchema = Yup.object({
        facility: Yup.number().required(i18n.t('Please select facility')),
        item: Yup.number().required(i18n.t('Please select Invetory Type')),
        current_quantity: Yup.number().required(i18n.t('Please fill Current quantity')),
        required_quantity: Yup.number().required(i18n.t('Please fill Required quantity')),
    });

    const handleSubmit = async (data, { resetForm, setSubmitting }) => {
        if(editMode) {
            const response = await updateInventories(data, data.id);
            if (response.status === true) {
                props.createToastNotification(
                    ToastUtils.toastDict((new Date()).getTime(), "updated", "Successfully updated ", SUCCESS)
                )
            } else {
                props.createToastNotification(
                    ToastUtils.toastDict((new Date()).getTime(), "Added",  response.error, DANGER)
                )
            }
        } else {
            const response = await createInventories(data);
            setSubmitting(false);
            resetForm();
            if (response.status === true) {
                props.createToastNotification(
                    ToastUtils.toastDict((new Date()).getTime(), "Added", "Successfully added ", SUCCESS)
                )
            } else {
                props.createToastNotification(
                    ToastUtils.toastDict((new Date()).getTime(), "Added", response.error, DANGER)
                )
            }
        }
        if(!isAddAnother) {
            onClose();
        }
    }


    // const createInventory = async () => {
    //     let initial = inventoryData;
    //     if (!_.isEmpty(facilityList) && !_.isEmpty(inventoryTypesList)) {
    //         if (initial && !data) {
    //             Object.keys(facilityList).forEach((facility, index) => {
    //                 if (initial.name.label === facilityList[facility].name) {
    //                     initial['facility'] = facilityList[facility].id
    //                     return;
    //                 }
    //             });
    //             Object.keys(inventoryTypesList).forEach((inventoryitem, index) => {
    //                 if (initial.type.label === inventoryTypesList[inventoryitem].name) {
    //                     initial['item'] = inventoryTypesList[inventoryitem].id
    //                     return;
    //                 }
    //             });
    //         }
    //         delete initial.name;
    //         delete initial.type;
    //         setInventoryData(initial);
    //         let response;
    //         if (isAddAnother === false && data) {
    //             response = await updateInventories(initial, data.id);
    //             if (response.status === true) {
    //                 props.createToastNotification(
    //                     ToastUtils.toastDict((new Date()).getTime(), "updated", "Successfully updated ", SUCCESS)
    //                 )
    //             } else {
    //                 props.createToastNotification(
    //                     ToastUtils.toastDict((new Date()).getTime(), "Added",  response.error, DANGER)
    //                 )
    //             }
    //         } else {
    //             response = await createInventories(initial);
    //             if (response.status === true) {
    //                 props.createToastNotification(
    //                     ToastUtils.toastDict((new Date()).getTime(), "Added", "Successfully added ", SUCCESS)
    //                 )
    //             } else {
    //                 props.createToastNotification(
    //                     ToastUtils.toastDict((new Date()).getTime(), "Added", response.error, DANGER)
    //                 )
    //             }
    //         }
    //     }
    //     if (!isAddAnother) {
    //         onClose();
    //     }
    // }

    // const handleChange = (name, e) => {
    //     if (typeof name === 'object') {
    //         setInventoryData({ ...inventoryData, ...name });
    //     } else {
    //         setInventoryData({ ...inventoryData, [name]: e });
    //     }
    //     switch (name) {
    //         case 'required_quantity':
    //             errors.required_quantity = e ? false : true;
    //             break;
    //         case 'current_quantity':
    //             errors.current_quantity = e ? false : true;
    //             break;
    //         default: break;
    //     }
    //     setErrors(prevState => ({
    //         ...prevState,
    //         ...errors
    //     }))
    // }

    const getMappedData = (data) => {
        if(data && !_.isEmpty(data) && facilityName && inventoryType && !_.isEmpty(facilityName) && !_.isEmpty(inventoryType)) {
            const facility = facilityName.find(item => item.label == data.facility);
            const type = inventoryType.find(type => type.label == data.item);
            return {
                ...data,
                facility: facility ? facility.value: data.facility,
                item: type ? type.value : data.type
            }
        }
        return data;
    }

    return (
        <CustomModal open={open} onClose={onClose} title={i18n.t('Inventory')}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Formik
                    initialValues={data ? getMappedData(data): {
                        facility: "",
                        item: "",
                        current_quantity: "",
                        required_quantity: ""
                    }}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                    >
                        {
                            props => <Form 
                            data={inventoryData}
                            updateData={data} 
                            isAddAnother={isAddAnother} 
                            addAnother={addAnother} 
                            {...props}
                            editMode={editMode}
                            facilityName={facilityName} 
                            inventoryType={inventoryType} 
                            />
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
            </Grid>
        </CustomModal>
    );
}


const mapStateToProps = (state) => {
    const { inventory, inventoryTypes, shortFacilities } = state;
    return {
        inventoryList: inventory.results,
        inventoryTypesList: inventoryTypes,
        facilityList: shortFacilities.results,
        count: state.inventory.count,
    };
};

InventoryForm.propTypes = {
    inventoryList: PropTypes.array.isRequired,
    inventoryTypesList: PropTypes.array.isRequired,
    facilityList: PropTypes.array.isRequired,
    createInventories: PropTypes.func.isRequired,
    updateInventories: PropTypes.func.isRequired,
    createToastNotification: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { createInventories, updateInventories, createToastNotification })(InventoryForm);
