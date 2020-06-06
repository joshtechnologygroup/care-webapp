import React from 'react';
import { useTranslation } from "react-i18next";
import { Formik } from 'formik';
import Form from './form';
import { PropTypes } from 'prop-types';
import * as Yup from 'yup';

export default function MedicationDetailForm(props) {
  const { profile, handleSubmit, cancelCallback, setFormD, fieldErrorDict, editMode, saveProfile } = props;
  const { i18n } = useTranslation();
  
  const validationSchema = Yup.object({
    covid_status: Yup.string().required(i18n.t('Please select COVID status')),
    clinical_status: Yup.number().required(i18n.t('Please select clinical status')),
    patient_symptoms: Yup.array().of(Yup.number()).min(1, i18n.t('Please select atleast one symptom')),
    patient_diseases: Yup.array().of(Yup.number()),
  });
  const submit= (data) => {
    handleSubmit(data);
  };
  return (
    <Formik
      initialValues={profile}
      validationSchema={validationSchema}
      onSubmit={submit}
    >
      {
        props => <Form {...props} setFormD={setFormD} fieldErrorDict={fieldErrorDict} cancelCallback={cancelCallback} saveProfile={saveProfile} editMode={editMode} />
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
