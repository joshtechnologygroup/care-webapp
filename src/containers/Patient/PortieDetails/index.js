import React from 'react';
import { useTranslation } from "react-i18next";
import { PropTypes } from 'prop-types';
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Typography,
  Chip,
  Button,
  Fab,
} from '@material-ui/core';

import NullState from 'Components/NullState';
import PortieNull from 'Assets/images/portie_null.jpg';
import PortieDetailCard from 'Components/Cards/PortieDetailCard';
import CreateUpdatePortieDetails from './createUpdateForm';

export default function PortieDetails(props) {
  const { i18n } = useTranslation();
  const { profile } = props;

  let editableId;
  const [editable, setEditable] = React.useState(editableId);
  
  const edit = (id) => {
    setEditable(id);
  };
  const add = () => {
    setEditable('new');
  };

  const handleSubmit = (data) => {
    if (editable === 'new') {
      profile.unshift(data);
      setEditable('');
    }
    else {
      profile[editable] = data;
      setEditable('');
    }
    console.log('data subitted', data);
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
              handleSubmit={handleSubmit}
              cancelCallback={cancel}
              key={index}
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
};

PortieDetails.defaultProps = {
  profile: []
};
