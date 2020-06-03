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
import { GET_PATIENT_URL } from 'Src/routes';
import { TRANSFER_STATUS_CHOICES } from "Constants/app.const";
import FormHelperText from '@material-ui/core/FormHelperText';
import { fetchPatient } from 'Actions/PatientsAction';

function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}

export function Form(props) {
    const classes = useStyles();
    const {
        handleSubmit,
        setFieldValue,
        setFieldTouched,
        initialValues,
        addTransferErrors,
        errors,
        patient,
        getPatient
      } = props;
    const { i18n } = useTranslation();
    const [inputValue, setInputValue] = useState("");
    const transferStatusChoices = Object.keys(TRANSFER_STATUS_CHOICES).map((key) => ({
        'value': key,
        'label': TRANSFER_STATUS_CHOICES[key]
    })); 

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
        const response = await CommonService.makeAuthorizedApiCall(`${GET_PATIENT_URL}?limit=3&offset=0&name=${inputValue}`, GET, {},  {})
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
                <Grid item sm={6} xs={12}>
                    <label className={classes.label}>{i18n.t('From Facility')}</label>
                    <Select
                        options={facilityName}
                        defaultValue={""}
                        name="from_facility"
                        onChange={(val) => setFieldValue('from_facility', val.value)}
                        error={errors.from_facility}
                    />
                    {
                    errors.from_facility && 
                    <FormControl component="fieldset" error={true}>
                        <FormHelperText className={classes.error}>{errors.from_facility}</FormHelperText>
                    </FormControl>
                    }
                </Grid>
                <Grid item sm={6} xs={12}>
                    <label className={classes.label}>{i18n.t('To Facility')}</label>
                    <Select
                        options={facilityName}
                        defaultValue={""}
                        name="to_facility"
                        onChange={(val) => setFieldValue('to_facility', val.value)}
                        error={errors.to_facility}
                    />
                    {
                    errors.to_facility && 
                    <FormControl component="fieldset" error={true}>
                        <FormHelperText className={classes.error}>{errors.to_facility}</FormHelperText>
                    </FormControl>
                    }
                </Grid>
                <Grid item sm={6} xs={12}>
                    <label className={classes.label}>{i18n.t('Patient')}</label>
                    <AsyncSelect
                        cacheOptions
                        loadOptions={loadOptions}
                        defaultOptions={[{}]}
                        onInputChange={handleInputChange}
                        onChange={(val) => {
                            setFieldValue('patient', val.value);
                            showProfileCard(val.value);
                        }}
                    />
                    {
                    errors.patient && 
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
                <Grid item sm={6} xs={12}>
                    <label className={classes.label}>{i18n.t('Status')}</label>
                    <Select
                        options={transferStatusChoices}
                        defaultValue={transferStatusChoices[0]}
                        name="status"
                        onChange={(val) => setFieldValue('status', val.value)}
                    />
                    {
                    errors.status && 
                    <FormControl component="fieldset" error={true}>
                        <FormHelperText className={classes.error}>{errors.status}</FormHelperText>
                    </FormControl>
                    }
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextField
                        name="Comments"
                        label={i18n.t('Comments')}
                        onChange={changeText.bind(null, 'comments')}
                        fullWidth
                    />
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
                        {i18n.t('Submit')}
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
    facilityList: state.shortFacilities,
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
