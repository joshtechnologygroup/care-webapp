import React from 'react';
import { useTranslation } from "react-i18next";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Grid, Typography, Card, } from '@material-ui/core';
import Form from './form';
import { createUpdatePatientFamilyDetails } from 'Actions/PatientsAction';
import { connect } from 'react-redux';
import { useParams } from "react-router-dom";
import { PropTypes } from 'prop-types';
import _ from 'underscore';

export const CreateUpdateForm = (props) => {
    const { editMode, details, handleSubmit, cancelCallback } = props;
    const { i18n } = useTranslation();

    const validationSchema = Yup.object({
        name: Yup.string().required(i18n.t('Please enter Family member name')),
        age_month: Yup.number().required(i18n.t('Please enter age')).max(11, i18n.t('Invalid value')).min(0, 'Invalid value'),
        age_year: Yup.number().required(i18n.t('Please enter age')).min(0, 'Invalid value'),
        phone_number: Yup.number().positive().required(i18n.t('Please enter phone number')).min(10, i18n.t('Please enter a valid contact number')),
        relation: Yup.string().required(i18n.t('Please choose relation with Patient')),
        gender: Yup.number().required(i18n.t('Please choose gender')),
    });

    const submit = async (data) => {
        handleSubmit(data);
    };

    return (
        <Card className="add-placeholder mb-5">
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h5">
                        {editMode ? i18n.t('Edit Family member') : i18n.t('Add Family member')}
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

CreateUpdateForm.propTypes = {
};

const mapStateToProps = (state) => ({
});


export default connect(mapStateToProps, null)(CreateUpdateForm);

