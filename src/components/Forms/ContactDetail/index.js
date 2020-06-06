import React, { useEffect } from 'react';
import { Formik } from 'formik';
import Form from './form';
import { PropTypes } from 'prop-types';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { getProfileDependencies } from 'Actions/PatientsAction';
export function ContactDetailForm(props) {
  const { profile, editMode, setContactForm, saveProfile, handleError, fieldErrorDict, fetchProfileDependencies, districts, states  } = props;
  const validationSchema = Yup.object({
    phone_number: Yup.number("Please enter contact number").required('Please enter contact number').test('len', 'Must be exactly 10 characters', val => (val ? val.toString() : "").length === 10),
    phone_number_belongs_to: Yup.string("Whom does this number blongs to?").required('Whom does this number belongs to?'),
    address: Yup.string("Please enter address"),
    district: Yup.string("Please enter district"),
    state: Yup.string("Please enter state"),
    pincode: Yup.number("Please enter pincode"),
  });

  const submit= (data) => {
    props.handleSubmit(data);
  };

  useEffect(() => {
    if (!districts || !states) {
      fetchProfileDependencies();
    }
  }, [districts, states]);

  return (
    <Formik
    initialValues={profile}
    validationSchema={validationSchema}
    onSubmit={submit}
    >
      {
        props => <Form editMode={editMode} setContactForm={setContactForm} fieldErrorDict={fieldErrorDict} saveProfile={saveProfile} districts={districts} handleError={handleError} states={states} {...props} />
      }
    </Formik>
  );
}

ContactDetailForm.propTypes = {
  profile: PropTypes.object.isRequired,
};

ContactDetailForm.defaultProps = {
  profile: {},
  fetchProfileDependencies: () => {},
  handleEdit:() => {},
  queryParams: {},
  count: 0,
};

const mapStateToProps = state => {
    const { districts, states } = state;
    return {
        districts:districts.results,
        states:states.results,
    };
};

const mapDispatchToProps = dispatch => {
    return {
      fetchProfileDependencies: params => {
            dispatch(getProfileDependencies(params));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactDetailForm);
