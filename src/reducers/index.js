import { combineReducers } from "redux";

import { user } from "Reducers/UserReducer";
import { facilities, facilityTypes } from "Reducers/FacilityReducer";
import { patients, clinicalStatus, clusterGroup, covidStatus } from "Reducers/PatientReducer";
import { ownershipTypes, districts } from "Reducers/MiscReducer";

export default combineReducers({
    user: user,
    facilities: facilities,
    facilityTypes: facilityTypes,
    ownershipTypes: ownershipTypes,
    districts: districts,
    patients,
    clinicalStatus,
    clusterGroup,
    covidStatus
});
