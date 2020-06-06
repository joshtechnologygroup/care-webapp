import React from 'react';
import { useTranslation } from "react-i18next";
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import {
  Card,
  Button,
} from '@material-ui/core';
import { useParams } from "react-router-dom";
import NullState from 'Components/NullState';
import PortieNull from 'Assets/images/portie_null.jpg';
import PortieDetailCard from 'Components/Cards/PortieDetailCard';
import CreateUpdatePortieDetails from './createUpdateForm';
import { createPortieDetails, updatePortieDetails, getPorteaUsers } from 'Actions/PortieAction';
import _ from 'underscore';
import { fetchPatient } from 'Actions/PatientsAction';
import { createToastNotification } from 'Actions/ToastAction';
import * as ToastUtils from 'Src/utils/toast';
import {SUCCESS, DANGER, HOME_ISOLATION_STATUS} from "Src/constants";

export function PortieDetails(props) {
  let { patientId } = useParams();
  const { i18n } = useTranslation();
  const { 
    profile,
    createPortieDetails, 
    updatePortieDetails, 
    porteaUsers, 
    getPorteaUsers, 
    fetchPatient,
    createToastNotification ,
    patientStatus,
    patient,
} = props;

  let editableId;
  const [editable, setEditable] = React.useState(editableId);
  const [createPortieErrors, setCreatePortieErrors] = React.useState({});
  const [updatePortieErrors, setUpdatePortieErrors] = React.useState({})

  const edit = (id) => {
    setEditable(id);
  };
  const add = () => {
    setEditable('new');
  };

  React.useEffect(() => {
    if(_.isEmpty(porteaUsers)) {
        getPorteaUsers();
    } 
  }, [porteaUsers])

  const handleSubmit = async (data) => {
    let initial = data;
    let portie_response;
    initial['patient'] = patientId;
    if (editable === 'new') {
      portie_response = await createPortieDetails(initial);
      if (portie_response.status) {
        setEditable('');
        profile.unshift(data);
        createToastNotification(
            ToastUtils.toastDict((new Date()).getTime(), "Added", "Successfully added ", SUCCESS)
        )
      } else {
        setCreatePortieErrors(portie_response.errors);
      }
    }
    else {
      profile[editable] = data;
      portie_response = await updatePortieDetails(initial, data.id);
      if (portie_response.status) {
        setEditable('');
        createToastNotification(
            ToastUtils.toastDict((new Date()).getTime(), "updated", "Successfully updated ", SUCCESS)
        )
      } else {
        setUpdatePortieErrors(portie_response.errors);
      }
    }
    fetchPatient(patientId);
  };

  const cancel = () => {
    setEditable('');
  };

  return (
    <div className="mb-20">
      <div className="section-header">
        <h4 className="heading--card">
          {i18n.t('Portie Calling Details')}
        </h4>

        {
            patientStatus === HOME_ISOLATION_STATUS && 
            <Button
            variant="contained"
            color="primary"
            disableElevation
            size="medium"
            className="btn"
            onClick={add}
            >
            + {i18n.t('Add new')}
            </Button>
        }
      </div>
      {
        editable === 'new' &&
        <CreateUpdatePortieDetails
          handleSubmit={handleSubmit}
          cancelCallback={cancel}
          editMode={false}
          details={{
              patient_phone_number: patient.contact_details.phone_number,
              relation: 1
          }}
          porteaUsers={porteaUsers}
          createPortieErrors={createPortieErrors}
        />
      }
      {
        profile.map((details, index) => {
          return index !== editable ?
            <PortieDetailCard
              key={index}
              details={details}
              editCallback={() => edit(index)}
            />
            :
            <CreateUpdatePortieDetails
              key={index}
              handleSubmit={handleSubmit}
              cancelCallback={cancel}
              editMode={true}
              details={details}
              porteaUsers={porteaUsers}
              updatePortieErrors={updatePortieErrors}
            />
        }
        )
      }
      {
        !profile.length && editable !== 'new' &&
        <Card>
          <NullState message={i18n.t('null_messages.portie')} img={PortieNull} />
        </Card>
      }
    </div>
  );
}

PortieDetails.propTypes = {
  profile: PropTypes.array.isRequired,
  createPortieDetails: PropTypes.func,
  updatePortieDetails: PropTypes.func,
};

PortieDetails.propTypes = {
};
  
const mapStateToProps = (state) => ({
    porteaUsers: state.porteaUsers
});

export default connect(mapStateToProps, { 
    createPortieDetails, 
    updatePortieDetails, 
    getPorteaUsers, 
    fetchPatient, 
    createToastNotification,
})(PortieDetails);
