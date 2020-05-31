import React from 'react';
import { Grid, Typography, } from '@material-ui/core';
import { useTranslation } from "react-i18next";
import { Formik } from 'formik';
import * as Yup from 'yup';
import Form from './form';

import Card from '@material-ui/core/Card';

export const CreateUpdatePortieDetails = (props) => {
    const { editMode, details, handleSubmit, cancelCallback } = props;

    const { i18n } = useTranslation();
    const validationSchema = Yup.object({
        status: Yup.boolean().required(i18n.t('Please select contact status.')),
        name: Yup.string().required(i18n.t('Please enter Portie name')),
        portie_phone_number: Yup.number().required(i18n.t('Please enter Portie contact number')).min(10, i18n.t('Please enter a valid contact number')),
        patient_relation: Yup.string().required(i18n.t('Please choose relation of Patient with the person')),
    });

    const submit = (data) => {
        console.log(data);
        handleSubmit(data);
    };

    return (
        <Card className="mb-10 add-placeholder">
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h5">
                        {editMode ? i18n.t('Edit Portie details') : i18n.t('Add new Portie details') }
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Formik
                        initialValues={details}
                        validationSchema={validationSchema}
                        onSubmit={submit}
                    >
                        {
                            props => <Form editMode={editMode} details={details} {...props} cancelCallback={cancelCallback} />
                        }
                    </Formik>
                </Grid>
            </Grid>
        </Card>
    );
}

export default CreateUpdatePortieDetails;
