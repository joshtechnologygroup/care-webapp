import React, { useEffect } from 'react';
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
import { getShortFacilitiesList } from 'Actions/FacilitiesAction'
export function FacilityDetails(props) {
  const { i18n } = useTranslation();
  const { profile, currentStatus, saveFacilityDetails, getShortFacilitiesList, shortFacilities, editMode } = props;

  const [editable, setEditable] = React.useState(editMode);
  let status =false;
  if(!profile){
    status =true;
  } else if(!profile.length){
    status = true;
  }

  const add = () => {
    setEditable(false);
  };
  
  useEffect(() => {
    props.getShortFacilitiesList();
  },[]);

  const handleSubmit = (data) => {
    if (editable === false) {
      profile.unshift(data);
      setEditable(true);
    }
  };

  const cancel = () => {
    setEditable('');
  };

  return (
    <div className="mb-20">
      <div className="section-header">
        <h4 className="heading--card">{i18n.t('Facility Details')}</h4>
        {
          status && !editable &&
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
          editable && profile &&
          <Grid item xs={12}>
            <CreateUpdateForm
              handleSubmit={handleSubmit}
              saveFacilityDetails={saveFacilityDetails}
              cancelCallback={cancel}
              editMode={profile.facility ? true : false}
              shortFacilities={shortFacilities}
              details={{'admitted_at':new Date(),'discharged_at':new Date()}}
            />
          </Grid>
        }
        { Array.isArray(profile) && profile && !editable && 
          profile.map((member, index) =>
            <Grid key={index} className="mb-0" item xs={12}>
              <FacilityDetailCard
                details={member}
              />
            </Grid>
          )
        }
        {
          status && editable === false &&
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
  currentStatus: PropTypes.array,
  getShortFacilitiesList: PropTypes.func
}

FacilityDetails.defaultProps = {
  profile: []
}

const mapStateToProps = (state) => ({
  currentStatus: state.currentStatus.results,
  shortFacilities: state.shortFacilities.results
});


export default connect(mapStateToProps, { getShortFacilitiesList })(FacilityDetails);
