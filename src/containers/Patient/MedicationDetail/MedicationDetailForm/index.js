import React from 'react';
import { Formik } from 'formik';
import Form from './form';
import { PropTypes } from 'prop-types';
import * as Yup from 'yup';

export default function MedicationDetailForm(props) {

  const { profile, editMode } = props;
  const validationSchema = Yup.object({
  });
  const submit= (data) => {
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

MedicationDetailForm.propTypes = {
  profile: PropTypes.object.isRequired,
  handleEdit: PropTypes.func
}

MedicationDetailForm.defaultProps = {
  profile: {}
}
