import React, { useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { Formik } from 'formik';
import Form from './form';
import { PropTypes } from 'prop-types';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { getProfileDependencies } from 'Actions/PatientsAction';
export function PersonalDetailForm(props) {
  const { i18n } = useTranslation();
  const { profile, editMode, setFormA, handleError, fieldErrorDict, saveProfile, clusterGroup, facilityList, fetchProfileDependencies, covidStatus, clinicalStatus, currentStatus, medicationDetails } = props;
  const validationSchema = Yup.object({
    name: Yup.string().required(i18n.t('Please enter Patient Name')),
    month: Yup.number().required(i18n.t('Please enter age in months')).max(11, i18n.t('Max value for months is 11')),
    year: Yup.number().required(i18n.t('Please enter age in years')).min(0, i18n.t('Invalid value for age')),
    gender: Yup.number(i18n.t('Please enter gender')).required(i18n.t('Gender is required')),
    icmr_id: Yup.string().required(i18n.t('Please enter ICMR ID')),
    govt_id: Yup.string().required(i18n.t('Please enter Govt ID')),
    cluster_group: Yup.number(),
    patient_status: Yup.number(),
  });

  const submit= (data) => {
    props.handleSubmit(data);
    console.log('aaaaaaaaaaa');
  };
  
  useEffect(() => {
    if (!facilityList || !covidStatus || !clinicalStatus || !currentStatus || !clusterGroup) {
      fetchProfileDependencies();
    }
  }, [facilityList, covidStatus, clinicalStatus, currentStatus, clusterGroup ]);
  return (
    <Formik
      initialValues={profile}
      validationSchema={validationSchema}
      onSubmit={submit}
      >
         {(props) => (
       <Form editMode={editMode} fieldErrorDict={fieldErrorDict} setFormA={setFormA} facilityList={facilityList} clusterGroup={clusterGroup} medicationDetails={medicationDetails} handleError={handleError} covidStatus={covidStatus} clinicalStatus={clinicalStatus} currentStatus={currentStatus} saveProfile={saveProfile}{...props} />
      )}
    </Formik>
  );
}

PersonalDetailForm.propTypes = {
  profile: PropTypes.object.isRequired,
  handleEdit: PropTypes.func
}

PersonalDetailForm.defaultProps = {
  profile: {},
  fetchInventoryDependencies: () => {},
  handleEdit:() => {},
  handleSubmit:() => {},
  queryParams: {},
  count: 0,
};

const mapStateToProps = state => {
    const { facilities, covidStatus, clinicalStatus, currentStatus, clusterGroup } = state;
    return {
        facilityList: facilities.results,
        covidStatus:covidStatus.results,
        clinicalStatus:clinicalStatus.results,
        currentStatus:currentStatus.results,
        clusterGroup: clusterGroup.results
    };
};

const mapDispatchToProps = dispatch => {
    return {
      fetchProfileDependencies: params => {
            dispatch(getProfileDependencies(params));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonalDetailForm);
