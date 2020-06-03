import React from 'react';
import { useTranslation } from "react-i18next";
import { Formik } from 'formik';
import Form from './form';
import { PropTypes } from 'prop-types';
import * as Yup from 'yup';

export default function MedicationDetailForm(props) {
  const { profile, handleSubmit, cancelCallback, editMode } = props;
  const { i18n } = useTranslation();
  
  const validationSchema = Yup.object({
    covid_status: Yup.string().required(i18n.t('Please select COVID status')),
    clinical_status: Yup.number().required(i18n.t('Please select clinical status')),
    symptoms: Yup.array().of(Yup.string()).min(1, i18n.t('Please select atleast one symptom')),
    nonCovidDiseases: Yup.array().of(Yup.string()),
  });
  const submit= (data) => {
    console.log("abc")
    handleSubmit(data);
  };
  return (
    <Formik
      initialValues={profile}
      validationSchema={validationSchema}
      onSubmit={submit}
    >
      {
        props => <Form {...props} cancelCallback={cancelCallback} editMode={editMode} />
      }
    </Formik>
  );
}

MedicationDetailForm.propTypes = {
  profile: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func,
  cancelCallback: PropTypes.func,
  editMode: PropTypes.bool,

}

MedicationDetailForm.defaultProps = {
  profile: {}
}
