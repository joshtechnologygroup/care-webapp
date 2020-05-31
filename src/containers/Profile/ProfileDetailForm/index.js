import React from 'react';
import { Formik } from 'formik';
import Form from './form';
import { PropTypes } from 'prop-types';
import * as Yup from 'yup';

export default function ProfileDetailForm(props) {
  const { profile, editMode } = props;
  const validationSchema = Yup.object({
    name: Yup.string("Please enter name").required('Please enter name'),
    phone: Yup.string("Please enter phone number").required('Please enter phone number'),
    districtPreference: Yup.string("Please enter district").required('Please enter district'),
  });
  const submit= (data) => {
    console.log('-----', data);
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

ProfileDetailForm.propTypes = {
  profile: PropTypes.object.isRequired,
  handleEdit: PropTypes.func
};

ProfileDetailForm.defaultProps = {
  profile: {}
};
