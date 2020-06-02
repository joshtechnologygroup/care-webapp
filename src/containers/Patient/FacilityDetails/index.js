import React from 'react';
import { useTranslation } from "react-i18next";
import { PropTypes } from 'prop-types';
import {
  Grid,
  Card,
  Button,
} from '@material-ui/core';
import _ from 'underscore';
import FacilityDetailCard from 'Components/Cards/FacilityDetailCard';
import NullState from 'Components/NullState';
import nullImage from 'Assets/images/facility.jpg';
import { CreateUpdateForm } from './createUpdateForm';
import { connect } from 'react-redux';
import { facilityStatusChoices } from 'Mockdata/facilityStatusChoices.json';
export function FacilityDetails(props) {
  const { i18n } = useTranslation();
  const { profile, currentStatus } = props;

  let editableId;
  const [editable, setEditable] = React.useState(editableId);
  let status = true;
  if (profile.length === 1 && facilityStatusChoices[profile[0].patient_status - 1].name === 'Home Isolation' || _.isEmpty(profile)) {
    status = false;
  }

  const add = () => {
    setEditable('new');
  };

  const handleSubmit = (data) => {
    if (editable === 'new') {
      profile.unshift(data);
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
        <h4 className="heading--card">{i18n.t('Facility Details')}</h4>
        {
          !profile.length &&
          <Button
            variant="contained"
            color="primary"
            disableElevation
            size="medium"
            className="btn"
            onClick={add}
          >
            + {i18n.t('Add Facility')}
          </Button>
        }
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
        {status &&
          profile.map((member, index) =>
            <Grid key={index} className="mb-0" item xs={12}>
              <FacilityDetailCard
                details={member}
              />
            </Grid>
          )
        }
        {
          editable !== 'new' && !status &&
          <Grid item xs={12} className="mb-0">
            <Card>
              <NullState img={nullImage} message={i18n.t('null_messages.facility')} />
            </Card>
          </Grid>
        }
      </Grid>
    </div>
  );
}

FacilityDetails.propTypes = {
  profile: PropTypes.array.isRequired,
  handleEdit: PropTypes.func,
  currentStatus: PropTypes.array.isRequired,
}

FacilityDetails.defaultProps = {
  profile: []
}

const mapStateToProps = (state) => ({
  currentStatus: state.currentStatus.results,
});


export default connect(mapStateToProps, null)(FacilityDetails);
