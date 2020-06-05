import React from 'react';
import { useTranslation } from "react-i18next";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Grid, Typography, Card, } from '@material-ui/core';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';  
import Form from './form';
import _ from 'underscore';

export const CreateUpdateForm = (props) => {
    const { editMode, details, handleSubmit, cancelCallback, saveLabDetails, testingLabs, } = props;
    const { i18n } = useTranslation();
    const validationSchema = Yup.object({
        testing_lab: Yup.string().required(i18n.t('Please select Lab')),
        result: Yup.number().required(i18n.t('Please select current test status')),
        date_of_sample: Yup.date().required(i18n.t('Please select date of sample collection')),
    });

    const submit = async (data) => {
        handleSubmit(data);
    };

    return (
        <Card className="add-placeholder mb-5">
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h5">
                        {editMode ? i18n.t('Edit Lab test') : i18n.t('Add Lab test') }
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Formik
                        initialValues={details}
                        validationSchema={validationSchema}
                        onSubmit={submit}
                    >
                        {
                            props => <Form editMode={editMode}testingLabs={testingLabs} details={details}saveLabDetails={saveLabDetails} {...props} cancelCallback={cancelCallback} />
                        }
                    </Formik>
                </Grid>
            </Grid>
        </Card>
    );
}


CreateUpdateForm.propTypes = {
  testingLabs: PropTypes.array.isRequired,
};
  
const mapStateToProps = (state) => ({
});
  
  
export default connect(mapStateToProps, null)(CreateUpdateForm);
