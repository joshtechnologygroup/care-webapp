import React,{ useEffect } from 'react';
import { Formik } from 'formik';
import Form from './form';
import { PropTypes } from 'prop-types';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { getProfileDependencies } from 'Actions/PatientsAction';
export function PersonalDetailForm(props) {

  const { profile, editMode, handleSave, handleError, saveProfile, clusterGroup, facilityList, fetchProfileDependencies, covidStatus, clinicalStatus, currentStatus } = props;
  const validationSchema = Yup.object({
    name: Yup.string("Please enter name").required('Patient Name is required'),
    month: Yup.number("Please enter months").required('Months is required').max(12, "Max value for months is 12"),
    year: Yup.number("Please enter years").required('Years is required').min(0, "Invalid value for age"),
    gender: Yup.number("Please enter gender").required('Gender is required'),
    icmr_id: Yup.string("Please enter ICMR ID").required('ICMR ID is required'),
    govt_id: Yup.number("Please enter Govt. ID").required('Govt ID is required'),
    cluster_group: Yup.string("Please enter Cluster group").required('Cluster group is required'),
    clinical_status: Yup.string("Please enter clinical status").required('Clinical status is required'),
    patient_status: Yup.string("Please enter patient status").required('patient status is required'),
    covid_status:  Yup.string("Please enter covid status").required('covid status is required'),
  });

  const submit= () => {
    handleSave();
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
      {
        props => <Form editMode={editMode} facilityList={facilityList} clusterGroup={clusterGroup} handleError={handleError} covidStatus={covidStatus} clinicalStatus={clinicalStatus} currentStatus={currentStatus} saveProfile={saveProfile}{...props} />
      }
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
