import React, { useEffect} from 'react';
import { useTranslation } from "react-i18next";
import {
  Grid,
  Card,
  Button,
  CardContent,
} from '@material-ui/core';
import { PropTypes } from 'prop-types';
import { useParams } from "react-router-dom";
import MedicationDetailView from './medicationDetailView';
import MedicationUpdateForm from './MedicationUpdateForm';
import { connect } from 'react-redux';
import { updatePatientMedicationDetails } from 'Actions/PatientDetailsAction';
import { createToastNotification } from 'Actions/ToastAction';
import * as ToastUtils from 'Src/utils/toast';
import {SUCCESS, DANGER} from "Src/constants";

export function MedicationDetail(props) {
  const { i18n } = useTranslation();
  let { patientId } = useParams();
  const { profile, editMode, saveProfile, setMedicationForm, fieldErrorDict, updatePatientMedicationDetails } = props;
  const [editable, setEditable] = React.useState(editMode);
  const[data, setData] = React.useState(profile);

  const cancelEdit = () => {
    setEditable(false);
  };

  const setEdit = () => {
    setEditable(true);
  };



  const handleSubmit = async (data) => {
    cancelEdit();
    let response;
    let initial = data;
    initial['patient'] = patientId;
    if (editable === true && !saveProfile) {
      response = await updatePatientMedicationDetails(initial, patientId);
      if (response.status) {
        setData(data);
         props.createToastNotification(ToastUtils.toastDict((new Date()).getTime(), "Updated", "Successfully updated " , SUCCESS))
      } else {
        props.createToastNotification(
          ToastUtils.toastDict((new Date()).getTime(), "Added", "Some Error Occurred", DANGER)
      )
      }
    }
  };

  return (
    <>
      <div className="section-header">
        <h4 className="heading--card">{i18n.t('Medication Details')}</h4>
        {
          !editable &&
          <Button
            variant="contained"
            color="primary"
            disableElevation
            size="medium"
            className="btn"
            onClick={setEdit}
          >
              {i18n.t('Edit')}
          </Button>
        }
      </div>
        <Card elevation={4}>
          <CardContent>
            <Grid container>
              {
                editable ?
                <MedicationUpdateForm setMedicationForm={setMedicationForm} fieldErrorDict={fieldErrorDict} editMode={profile.covid_status ? true : false} handleSubmit={handleSubmit} saveProfile={saveProfile} cancelCallback={cancelEdit} profile={data} />
                :
                <MedicationDetailView profile={data} />
              }
            </Grid>
          </CardContent>
        </Card>
    </>
  );
}

MedicationDetail.propTypes = {
  profile: PropTypes.object.isRequired,
  editMode: PropTypes.bool,
  updatePatientMedicationDetails: PropTypes.func,
  createToastNotification: PropTypes.func
}

MedicationDetail.defaultProps = {
  profile: {}
}

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps, { updatePatientMedicationDetails, createToastNotification })(MedicationDetail);
