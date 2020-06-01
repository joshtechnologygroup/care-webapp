import React from 'react';
import { useTranslation } from "react-i18next";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Grid, Typography, Card, } from '@material-ui/core';
import Form from './form';

export const CreateUpdateForm = (props) => {
    const { editMode, details, handleSubmit, cancelCallback } = props;
    const { i18n } = useTranslation();

    const validationSchema = Yup.object({
        name: Yup.string().required(i18n.t('Please Select doctor')),
    });

    const submit = (data) => {
        handleSubmit(data);
        console.log('data', data);
    };

    return (
        <Card className="add-placeholder mb-5">
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h5">
                        {editMode ? i18n.t('Change doctor attendant') : i18n.t('Add Doctor attendant') }
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

export default CreateUpdateForm;
