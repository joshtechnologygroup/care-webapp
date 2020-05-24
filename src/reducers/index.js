import { combineReducers } from "redux";
import UserReducer from "Reducers/UserReducer";
import { facilities, facilityTypes } from "Reducers/FacilityReducer";
import { ownershipTypes, districts } from "Reducers/CommonReducer";

export default combineReducers({
    User: UserReducer,
    facilities: facilities,
    ownershipTypes: ownershipTypes,
    districts: districts,
    facilityTypes: facilityTypes
});
