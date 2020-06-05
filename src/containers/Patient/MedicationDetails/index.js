import React from 'react';
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

export function MedicationDetail(props) {
  const { i18n } = useTranslation();
  let { patientId } = useParams();
  const { profile, editMode, saveProfile, setFormD, fieldErrorDict, updatePatientMedicationDetails } = props;
  const [editable, setEditable] = React.useState(editMode);

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
    if (editable === true) {
      response = await updatePatientMedicationDetails(initial, patientId);
      if (response.status) {
        alert('updated medication details successfully');
      } else {
        alert(response.error);
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
                <MedicationUpdateForm setFormD={setFormD} fieldErrorDict={fieldErrorDict} editMode={profile.covid_status ? true : false} handleSubmit={handleSubmit} saveProfile={saveProfile} cancelCallback={cancelEdit} profile={profile} />
                :
                <MedicationDetailView profile={profile} />
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
  updatePatientMedicationDetails: PropTypes.func
}

MedicationDetail.defaultProps = {
  profile: {}
}

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps, { updatePatientMedicationDetails })(MedicationDetail);
