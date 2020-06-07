import React from 'react';
import { useTranslation } from "react-i18next";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Grid, Typography, Card, } from '@material-ui/core';
import Form from './form';
import _ from 'underscore';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { reachableStatus } from 'Constants/app.const';

export const CreateUpdatePortieDetails = (props) => {
    const { editMode, details, handleSubmit, cancelCallback, porteaUsers, createPortieErrors, updatePortieErrors } = props;
    const { i18n } = useTranslation();

    const validationSchema = Yup.object({
        able_to_connect: Yup.boolean().required(i18n.t('Please select contact status')),
        portie: Yup.number().required(i18n.t('Please enter Portie name')),
        patient_phone_number: Yup.number().required(i18n.t('Please enter Patient contact number')).min(10, i18n.t('Please enter a valid contact number')),
        relation: Yup.string().required(i18n.t('Please choose relation of Patient with the person')),
    });

    const submit = async (data) => {
        handleSubmit(data);
    };

    return (
        <Card className="mb-10 add-placeholder">
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h5">
                        {editMode ? i18n.t('Edit Portie details') : i18n.t('Add new Portie details')}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Formik
                        initialValues={editMode ? details : {
                            'relation': 1,
                            "portie": "",
                            "patient_phone_number": details.patient_phone_number,
                            "able_to_connect": false,
                            "called_at": new Date(),
                        }}
                        validationSchema={validationSchema}
                        onSubmit={submit}
                    >
                        {
                            props => <Form 
                            editMode={editMode} 
                            porteaUsers={porteaUsers} 
                            details={details} {...props} 
                            cancelCallback={cancelCallback} 
                            createPortieErrors={createPortieErrors}
                            updatePortieErrors={updatePortieErrors}
                            />
                        }
                    </Formik>
                </Grid>
            </Grid>
        </Card>
    );
}

CreateUpdatePortieDetails.propTypes = {
    testingLabs: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
    testingLabs: state.testingLabs.results,
});

export default connect(mapStateToProps, null)(CreateUpdatePortieDetails);

