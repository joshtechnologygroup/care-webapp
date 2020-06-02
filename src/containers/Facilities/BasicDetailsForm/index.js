import React from 'react';
import {Formik} from 'formik';
import Form from './form';
import {PropTypes} from 'prop-types';
import * as Yup from 'yup';

export default function BasicDetailsForm(props) {
  const {profile, editMode} = props;
  const validationSchema = Yup.object({
    facilityName: Yup.string("Please enter facility name").required('Please enter facility name'),
    facilityId: Yup.string("Please enter facility id").required('Please enter facility id'),
    address: Yup.string("Please enter address").required('Please enter address'),
    municipalWard: Yup.string("Please enter municipal ward").required('Please enter municipal ward'),
    city: Yup.string("Please enter City").required('Please enter City'),
    district: Yup.string("Please enter district").required('Please enter district'),
    state: Yup.string("Please enter state").required('Please enter state'),
    pincode: Yup.number("Please enter pincode").required('Please enter pincode') //.test('len', 'Invalid Pincode', val =>  val.length === 6),
  });
  const submit = (data) => {
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

BasicDetailsForm.propTypes = {
  profile: PropTypes.object.isRequired,
  handleEdit: PropTypes.func
};

BasicDetailsForm.defaultProps = {
  profile: {}
};
