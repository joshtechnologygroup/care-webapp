import React from 'react';
import { Formik } from 'formik';
import Form from './form';
import { PropTypes } from 'prop-types';
import * as Yup from 'yup';
import _ from "underscore";

export default function ProfileDetailForm(props) {
  const { profile, editMode, districtsList, handleCancel } = props;
  const validationSchema = Yup.object({
    name: Yup.string("Please enter name").required('Please enter name'),
    phone_number: Yup.string("Please enter phone number").required('Please enter phone number'),
    preferred_districts_id: Yup.string("Please enter district").required('Please enter district'),
  });
  const submit= (data) => {
    props.handleSubmit(data);
  };


  const [districtPreference, setDistrictPreference] = React.useState([]);

    React.useEffect(() => {
        if(!_.isEmpty(districtsList)) {
            setDistrictPreference(districtsList.map(district => ({
                'value': district.id,
                'label': district.name
            })))
        }
    }, [districtsList])

  return (
    <Formik
    initialValues={profile}
    validationSchema={validationSchema}
    onSubmit={submit}
    >
      {
        props => <Form editMode={editMode} {...props} districtPreference={districtPreference} handleCancel={handleCancel}/>
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
