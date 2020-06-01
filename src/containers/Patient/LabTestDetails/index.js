import React from 'react';
import { useTranslation } from "react-i18next";
import { PropTypes } from 'prop-types';
import {
  Grid,
  Button,
  Card,
} from '@material-ui/core';

import LabTestCard from 'Components/Cards/LabTestCard';
import NullState from 'Components/NullState';
import nullImage from 'Assets/images/lab-null.jpg';
import { CreateUpdateForm } from './createUpdateForm';

export default function LabTestDetail(props) {
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
    <>
      <div className="section-header">
        <h4 className="heading--card">{i18n.t('Lab Tests')}</h4>
        <Button
          variant="contained"
          color="primary"
          disableElevation
          size="medium"
          className="btn"
          onClick={add}
        >
          + {i18n.t('Add Lab test')}
        </Button>
      </div>
      <Grid container spacing={1}>
        {
          editable === 'new' &&
          <Grid item xs={12}>
            <CreateUpdateForm
              handleSubmit={handleSubmit}
              cancelCallback={cancel}
              editMode={false}
              details={{}}
            />
          </Grid>
        }
        {
          profile.map((test, index) => 
            <Grid key={index} className="mb-0" item xs={12}>
              {
                editable === index ?
                <CreateUpdateForm
                  handleSubmit={handleSubmit}
                  cancelCallback={cancel}
                  editMode={true}
                  details={test}
                />
                :
                <LabTestCard
                  className="mb-0"
                  details={test}
                  editCallback={() => edit(index)}
                />
              }
            </Grid>
          )
        }
        {
          !profile.length && editable !== 'new' &&
          <Grid item xs={12}>
            <Card className="mb-0">
              <NullState img={nullImage} message={i18n.t('null_messages.labtest')} />
            </Card>
          </Grid>
        }
      </Grid>
    </>
  );
}

LabTestDetail.propTypes = {
  profile: PropTypes.array.isRequired,
};

LabTestDetail.defaultProps = {
  profile: []
};
