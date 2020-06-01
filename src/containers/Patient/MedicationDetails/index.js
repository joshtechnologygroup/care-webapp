import React from 'react';
import { useTranslation } from "react-i18next";
import {
  Grid,
  Card,
  Button,
  CardContent,
} from '@material-ui/core';
import { PropTypes } from 'prop-types';

import MedicationDetailView from './medicationDetailView';
import MedicationUpdateForm from './MedicationUpdateForm';

export default function MedicationDetail(props) {
  const { i18n } = useTranslation();
  
  const { profile, editMode } = props;
  const [editable, setEditable] = React.useState(editMode);

  const cancelEdit = () => {
    console.log("reached", editable)
    setEditable(false);
  };

  const setEdit = () => {
    setEditable(true);
  };

  const handleSubmit = (data) => {
    cancelEdit();
    profile = data;
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
                <MedicationUpdateForm editMode={true} handleSubmit={handleSubmit} cancelCallback={cancelEdit} profile={profile} />
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
  editMode: PropTypes.bool
}

MedicationDetail.defaultProps = {
  profile: {}
}
