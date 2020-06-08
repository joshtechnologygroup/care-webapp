import React from 'react';
import { useTranslation } from "react-i18next";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Grid, Typography, Card, } from '@material-ui/core';
import Form from './form';
import _ from 'underscore';

export const CreateUpdateForm = (props) => {
    const { editMode, details, handleSubmit, fieldErrorDict, cancelCallback, setPatientFacilityForm, saveFacilityDetails, shortFacilities } = props;
    const { i18n } = useTranslation();
    const validationSchema = Yup.object({
        facility: Yup.number(),
        patient_status: Yup.number(),
        patient_facility_id: Yup.number(),
        admitted_at: Yup.date(),
        discharged_at: Yup.date(),
    });

    const submit = (data) => {
        handleSubmit(data);
    };

    return (
        <Card className="add-placeholder mb-5">
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h5">
                        {i18n.t('Add Facility')}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Formik
                        initialValues={details && !_.isEmpty(details) ? details : {
                            'facility': '',
                            'patient_facility_id': '',
                            'admitted_at': new Date(),
                            'patient_status': ''
                        }}
                        validationSchema={validationSchema}
                        onSubmit={submit}
                    >
                        {
                            props => <Form editMode={editMode} fieldErrorDict={fieldErrorDict} setPatientFacilityForm={setPatientFacilityForm} details={details} shortFacilities={shortFacilities} saveFacilityDetails={saveFacilityDetails} {...props} cancelCallback={cancelCallback} />
                        }
                    </Formik>
                </Grid>
            </Grid>
        </Card>
    );
}

export default CreateUpdateForm;
