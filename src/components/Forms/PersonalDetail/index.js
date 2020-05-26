import React from 'react';
import { Formik } from 'formik';
import Form from './form';
import { PropTypes } from 'prop-types';
import * as Yup from 'yup';

export default function PersonalDetailForm(props) {

    const { profile, editMode } = props;
    const validationSchema = Yup.object({
        firstName: Yup.string("Please enter first name").required('First name is required'),
        lastName: Yup.string("Please enter last name").required('Last name is required'),
        ageMonths: Yup.number("Please enter months").required('Months is required').max(12, "Max value for months is 12"),
        ageYears: Yup.number("Please enter years").required('Years is required').min(0, "Invalid value for age"),
        gender: Yup.string("Please enter gender").required('Gender is required'),
        idICMR: Yup.string("Please enter ICMR ID").required('ICMR ID is required'),
        idGovt: Yup.number("Please enter Govt. ID").required('Govt ID is required'),
        clusterGroup: Yup.string("Please enter Cluster group").required('Cluster group is required'),
    });
    const submit= (data) => {
        console.log(data);
        props.handleSubmit(data);
    };
    return (
        <Formik
            initialValues={profile}
            validationSchema={validationSchema}
            onSubmit={submit}
            >
            {
                props => <Form editMode={editMode} {...props} />
            }
        </Formik>
    );
}

PersonalDetailForm.propTypes = {
    profile: PropTypes.object.isRequired,
    handleEdit: PropTypes.func
}

PersonalDetailForm.defaultProps = {
    profile: {}
}
