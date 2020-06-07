import React, {useState, useEffect} from 'react';
import i18n from "i18next";
import BasicDetail from 'Containers/Facilities/BasicDetail';
import BasicDetailsForm from 'Containers/Facilities/BasicDetailsForm';
import InchargeContactDetail from 'Containers/Facilities/InchargeContactDetail';
import {getsFacilityDetailDependencies} from 'Actions/FacilityDetailsAction';
import {GET} from "Src/constants";
import * as ReducerTypes from 'Reducers/Types';
import ErrorPage from "Screens/ErrorPage";
import * as Routes from 'Src/routes';
import * as StringUtils from 'Src/utils/stringformatting';

import {connect} from "react-redux";
import {PatientsList} from "../containers/PatientsList";
import PropTypes from "prop-types";
import Loader from 'Components/Loader';

export function FacilityDetails(props) {
  const [formList, setFormList] = useState(['personal', 'contact']);
  const [isEditing, setIsEditing] = useState({personal: false, contact: false});
  const [id, setId] = useState(props.match.params.facilityId);
  const [facility, setFacility] = useState({contact: null, inchargeContactDetails: null});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let required_data = [[], []];

    const required = {
      'facilities': [Routes.FACILITY_LIST_URL, ReducerTypes.GET_FACILITY_LIST],
      'districts': [Routes.DISTRICT_LIST_URL, ReducerTypes.GET_DISTRICT_LIST],
      'state': [Routes.STATE_LIST_URL, ReducerTypes.GET_STATE_LIST],
      'cities': [Routes.CITIES_LIST_URL, ReducerTypes.GET_CITIES_LIST],
      'facilityType': [Routes.FACILITY_TYPE_LIST_URL, ReducerTypes.GET_FACILITY_TYPE_LIST],
      'ownershipType': [Routes.OWNERSHIP_TYPE_LIST_URL, ReducerTypes.GET_OWNERSHIP_TYPE_LIST],
      'facilityAdminstrators': [
        StringUtils.formatVarString(Routes.FACILITY_ADMINSTRATORS_LIST_URL, [id]),
        ReducerTypes.GET_FACILITY_ADMINSTRATORS_LIST]
    };

    Object.keys(required).forEach((list) => {
      if (!props[list]) {
        required_data[0].push([required[list][0], GET, {}, {}])
        required_data[1].push(required[list][1])
      }
    });

    props.getsFacilityDetailDependencies(required_data);
  }, []);


  useEffect(() => {
    const {facilities, district_list, states, cities, facilityTypes, ownershipTypes, facilityAdminstrators} = props;
    if (
      facilities &&
      id &&
      district_list &&
      states &&
      facilityTypes &&
      ownershipTypes &&
      facilityAdminstrators
    ) {
      const required_facility = facilities.find((value, index, array) => {
        return (parseInt(value.id) === parseInt(id));
      });

      const joinById = {
        'state': states,
        'city': cities,
        'district': district_list,
        'facility_type': facilityTypes,
        'owned_by': ownershipTypes
      };

      Object.keys(joinById).forEach((idKey) => {
        joinById[idKey].forEach(row => {
          if (required_facility[idKey] === row.id) {
            required_facility[idKey] = row.name
          }
        })
      });



      setFacility({inchargeContactDetails: facilityAdminstrators, contact: required_facility});
      setLoading(false);
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    props.facilities,
    props.district_list,
    props.cities,
    props.facilityAdminstrators
  ]);

  const setEditable = (key, value) => {
    setIsEditing({...isEditing, [key]: value});
  };
  const onSubmit = (data, key) => {

  };

  if (loading) {
    return ( 
    <div className="flex-col-center">
    <Loader />
    <h3>Loading...</h3>
  </div>
  );
  } else if (facility.contact) {
    return (
      <div>
        <h2 className="page-header header-container">{i18n.t('Facility Details')}</h2>
        <div className="page-container">
          {
            isEditing[formList[0]] ?
              <BasicDetailsForm
                profile={facility.contact}
                handleSubmit={(data) => onSubmit(data, formList[0])}
                editMode={true}
              /> :
              <BasicDetail
                profile={facility.contact}
                // profile={profile.contact}
                handleEdit={() => setEditable(formList[0], true)}
              />
          }
          <InchargeContactDetail
            profile={facility.inchargeContactDetails}
          />
        </div>
      </div>
    );
  } else {
    return <ErrorPage title={404} text="Page Not Found!"/>
  }
}

const mapStateToProps = (state) => ({
  states: state.states.results,
  facilities: state.facilities.results,
  district_list: state.districts.results,
  cities: state.cities.results,
  localBody: state.localBody.results,
  facilityTypes: state.facilityTypes.results,
  ownershipTypes: state.ownershipTypes.results,
  facilityAdminstrators: state.facilityAdminstrators.results
});

PatientsList.propTypes = {
  facilityAdminstrators: PropTypes.array,
  ownershipType: PropTypes.array,
  facilityTypes: PropTypes.array,
  localBody: PropTypes.array,
  cities: PropTypes.array,
  states: PropTypes.array,
  district_list: PropTypes.array,
  facilities: PropTypes.array,
  getsFacilityDetailDependencies: PropTypes.func
};

export default connect(mapStateToProps, {getsFacilityDetailDependencies})(FacilityDetails);
