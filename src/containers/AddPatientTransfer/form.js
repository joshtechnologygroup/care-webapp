import React, { useEffect, useState } from 'react';
import { TextField } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import AsyncSelect from 'react-select/async';

import PersonalDetail from 'Components/Cards/PersonalDetail';
import { useTranslation } from "react-i18next";
import {
    Grid,
} from '@material-ui/core';
import { PropTypes } from 'prop-types';
import Select from 'react-select'
import useStyles from './styles';
import { connect } from 'react-redux';
import _ from 'underscore'
import * as CommonService from "Src/utils/services";
import { GET } from "Src/constants";
import { GET_SHORT_PATIENT_LIST_URL } from 'Src/routes';
import FormHelperText from '@material-ui/core/FormHelperText';
import { fetchPatient } from 'Actions/PatientsAction';

export function Form(props) {
    const classes = useStyles();
    const {
        handleSubmit,
        setFieldValue,
        setFieldTouched,
        addTransferErrors,
        errors,
        patient,
        getPatient,
        clearPatient,
        touched,
      } = props;
    const { i18n } = useTranslation();
    const [inputValue, setInputValue] = useState("");
    const [selectedFacility, setSelectedFacility] = useState(null)

    const facilityName = []; 
    if(props.facilityList && !_.isEmpty(props.facilityList)){
        Object.keys(props.facilityList).forEach((facility, index) => {
            facilityName.push({
                'value': props.facilityList[facility].id,
                'label': props.facilityList[facility].name
            })
        }); 
    }

    const filterPatients = async (inputValue) => {
        const url = selectedFacility ? `${GET_SHORT_PATIENT_LIST_URL}?limit=3&offset=0&name=${inputValue}&from_facility=${selectedFacility}` : `${GET_SHORT_PATIENT_LIST_URL}?limit=3&offset=0&name=${inputValue}`
        const response = await CommonService.makeAuthorizedApiCall(url, GET, {},  {})
        const jsonResponse = await response.json();
        return jsonResponse.results;
    }

    const loadOptions = (inputValue, callback) => {
        filterPatients(inputValue).then((data) => {
            const patientOptions = data.map(patient => ({
                'value': patient.id,
                'label': patient.name
            }));
            callback(patientOptions);
        })
      };

    const changeText = (name, e) => {
        setFieldTouched(e.target.name);
        setFieldValue(name, e.target.value);
    };

    const handleInputChange = (newValue) => {
        const newInputValue = newValue.replace(/\W/g, '');
        setInputValue(newInputValue);
        return newInputValue;
    };

    const showProfileCard = (val) => {
        getPatient(val);
    }

    return (
        <form onSubmit={handleSubmit}>
            {
            addTransferErrors && addTransferErrors.non_field_errors && 
            <FormControl component="fieldset" error={true}>
                <FormHelperText className={classes.error}>{addTransferErrors.non_field_errors}</FormHelperText>
            </FormControl>
            }
            <Grid item container spacing={2}>
                <Grid item sm={12} xs={12}>
                    <label className={classes.label}>{i18n.t('From Facility')}</label>
                    <Select
                        options={facilityName}
                        name="from_facility"
                        onChange={(val) => {
                            setFieldTouched('from_facility');
                            setFieldValue('from_facility', val.value);
                            setSelectedFacility(val.value);
                            clearPatient();
                        }}
                        error={touched.from_facility && errors.from_facility}
                    />
                    {
                    touched.from_facility && errors.from_facility && 
                    <FormControl component="fieldset" error={true}>
                        <FormHelperText className={classes.error}>{errors.from_facility}</FormHelperText>
                    </FormControl>
                    }
                </Grid>
                <Grid item sm={12} xs={12}>
                    <label className={classes.label}>{i18n.t('Patient')}</label>
                    <AsyncSelect
                        loadOptions={loadOptions}
                        onInputChange={handleInputChange}
                        placeholder={i18n.t("Search by Patient Name")}
                        onChange={(val) => {
                            setFieldTouched('from_facility');
                            setFieldValue('patient', val.value);
                            showProfileCard(val.value);
                        }}
                    />
                    {
                    touched.patient && errors.patient && 
                    <FormControl component="fieldset" error={true}>
                        <FormHelperText className={classes.error}>{errors.patient}</FormHelperText>
                    </FormControl>
                    }
                    {!_.isEmpty(patient) && 
                        <PersonalDetail
                            profile={patient.personal_details[0]}
                            medicationDetails={{}}
                            handleEdit={() => {}}
                            hideEdit={true}
                        />
                    }
                </Grid>
                <Grid item sm={12} xs={12}>
                    <label className={classes.label}>{i18n.t('To Facility')}</label>
                    <Select
                        options={facilityName}
                        defaultValue={""}
                        name="to_facility"
                        onChange={(val) => {
                            setFieldTouched('to_facility')
                            setFieldValue('to_facility', val.value)
                        }}
                        error={errors.to_facility}
                    />
                    {
                    touched.to_facility && errors.to_facility && 
                    <FormControl component="fieldset" error={true}>
                        <FormHelperText className={classes.error}>{errors.to_facility}</FormHelperText>
                    </FormControl>
                    }
                </Grid>
                <Grid container justify="flex-end" className="mt-10" item xs={12}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disableElevation
                        size="medium"
                        className="btn py-5 ml-10"
                    >
                        {i18n.t('Initiate Transfer')}
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
    inventoryList:state.inventory.results,
    inventoryTypesList: state.inventoryTypes.results,
    facilityList: state.shortFacilities.results,
    count:state.inventory.count,
    patient: state.patient
});

const mapDispatchToProps = dispatch => {
    return {
        getPatient: (id) => {
            dispatch(fetchPatient(id));
        }
    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(Form);
