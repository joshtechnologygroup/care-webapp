import React from 'react';
import { useTranslation } from "react-i18next";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Grid, Typography, Card, } from '@material-ui/core';
import Form from './form';

export const CreateUpdateForm = (props) => {
    const { editMode, details, handleSubmit, fieldErrorDict, cancelCallback, setPatientFacilityForm, saveFacilityDetails, shortFacilities } = props;
    const { i18n } = useTranslation();
    const validationSchema = Yup.object({
        facility: Yup.number().required(i18n.t('Please select facility')),
        patient_status: Yup.number().required(i18n.t('Please select current status')),
        patient_facility_id:  Yup.number().required(i18n.t('Please input patient facility id')),
    });

    const submit = (data) => {
        handleSubmit(data);
    };

    return (
        <Card className="add-placeholder mb-5">
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h5">
                        {i18n.t('Add Facility') }
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Formik
                        initialValues={details}
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
