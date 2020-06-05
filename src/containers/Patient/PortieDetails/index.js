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
import { createPortieDetails, updatePortieDetails } from 'Actions/PortieAction';

export function PortieDetails(props) {
  let { patientId } = useParams();
  const { i18n } = useTranslation();
  const { profile, createPortieDetails, updatePortieDetails } = props;

  let editableId;
  const [editable, setEditable] = React.useState(editableId);

  const edit = (id) => {
    setEditable(id);
  };
  const add = () => {
    setEditable('new');
  };

  const handleSubmit = async (data) => {
    let initial = data;
    let portie_response;
    initial['patient'] = patientId;
    if (editable === 'new') {
      setEditable('');
      portie_response = await createPortieDetails(initial);
      if (portie_response.status) {
        profile.unshift(data);
        alert('updated');
      } else {
        alert(portie_response.error);
      }
    }
    else {
      profile[editable] = data;
      setEditable('');
      portie_response = await updatePortieDetails(initial, data.id);
      if (portie_response.status) {
        alert('updated');
      } else {
        alert(portie_response.error);
      }
    }
  };

  const cancel = () => {
    setEditable('');
  };

  return (
    <div className="mb-20">
      <div className="section-header">
        <h4 className="heading--card">
          {i18n.t('Portie Details')}
        </h4>
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
      </div>
      {
        editable === 'new' &&
        <CreateUpdatePortieDetails
          handleSubmit={handleSubmit}
          cancelCallback={cancel}
          editMode={false}
          details={{}}
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
  
export default connect(null, { createPortieDetails, updatePortieDetails })(PortieDetails);
