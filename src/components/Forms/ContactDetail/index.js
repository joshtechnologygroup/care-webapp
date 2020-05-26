import React from 'react';
import { Formik } from 'formik';
import Form from './form';
import { PropTypes } from 'prop-types';
import * as Yup from 'yup';

export default function ContactDetailForm(props) {
    const { profile, editMode } = props;
    const validationSchema = Yup.object({
        number: Yup.number("Please enter contact number").required('Please enter contact number'),
        numberBelongsTo: Yup.string("Whom does this number blongs to?").required('Whom does this number blongs to?'),
        address: Yup.string("Please enter address").required('Please enter address'),
        municipalWard: Yup.string("Please enter municipal ward").required('Please enter municipal ward'),
        city: Yup.string("Please enter City").required('Please enter City'),
        district: Yup.string("Please enter district").required('Please enter district'),
        state: Yup.string("Please enter state").required('Please enter state'),
        pincode: Yup.number("Please enter pincode").required('Please enter pincode') //.test('len', 'Invalid Pincode', val => {console.log(val); return val.length === 6}),
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

ContactDetailForm.propTypes = {
    profile: PropTypes.object.isRequired,
    handleEdit: PropTypes.func
};

ContactDetailForm.defaultProps = {
    profile: {}
};
