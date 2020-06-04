import React from 'react';
import { useTranslation } from "react-i18next";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Grid, Typography, Card, } from '@material-ui/core';
import Form from './form';
import _ from 'underscore';
import { connect } from 'react-redux';
import { useParams } from "react-router-dom";
import { PropTypes } from 'prop-types';
import { createUpdatePortieDetails } from 'Actions/PatientsAction';

export const CreateUpdatePortieDetails = (props) => {
    let { patientId } = useParams();
    const { editMode, details, handleSubmit, cancelCallback, createUpdatePortieDetails } = props;
    const { i18n } = useTranslation();

    const validationSchema = Yup.object({
        status: Yup.boolean().required(i18n.t('Please select contact status')),
        name: Yup.string().required(i18n.t('Please enter Portie name')),
        portie_phone_number: Yup.number().required(i18n.t('Please enter Portie contact number')).min(10, i18n.t('Please enter a valid contact number')),
        patient_relation: Yup.string().required(i18n.t('Please choose relation of Patient with the person')),
    });

    const submit = async (data) => {
        handleSubmit(data);
        let initial = data;
        let portie_response;
        if(editMode && _.isEmpty(details)){
            initial['patient'] = patientId;
            portie_response = await createUpdatePortieDetails(initial); 
        } else {
            portie_response = await createUpdatePortieDetails(initial, details.id); 
        }    
        if(portie_response.status) {
            alert('created updated');
        } else {
            alert(portie_response.error);
        }
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

CreateUpdatePortieDetails.propTypes = {
    testingLabs: PropTypes.array.isRequired,
    createUpdatePortieDetails: PropTypes.func.isRequired,
  };
    
  const mapStateToProps = (state) => ({
    testingLabs: state.testingLabs.results
  });
    
    
  export default connect(mapStateToProps, { createUpdatePortieDetails })(CreateUpdatePortieDetails);
  
