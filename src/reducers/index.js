import { combineReducers } from "redux";
import { user, profile } from "Reducers/UserReducer";
import { toasts } from "Reducers/ToastReducer"
import {
    patients, 
    clinicalStatus, 
    clusterGroup, 
    covidStatus,
    currentStatus, 
    states, 
    patient,
    testingLabs,
    fetchDetails
} from "Reducers/PatientReducer";
import {
    facilities,
    facilityAdminstrators,
    facilityTypes,
    facilityInventoryList,
    InventoryTypeList,
    facilityInfrastructure,
    createInventory, 
    shortFacilities,
    roomType,
    bedType,
    facilityStaff,
    staffDesignation,
    ownerships
} from "Reducers/FacilityReducer";
import {ownershipTypes, districts, cities, localBody, userTypes} from "Reducers/MiscReducer";
import { transfers } from "Reducers/TransferReducer";

export default combineReducers({
    user: user,
    facilities: facilities,
    inventory:facilityInventoryList,
    inventoryTypes:InventoryTypeList,
    facilityTypes: facilityTypes,
    ownershipTypes: ownershipTypes,
    districts: districts,
    patients,
    clinicalStatus,
    clusterGroup,
    covidStatus,
    transfers: transfers,
    facilityInfrastructure,
    roomType,
    bedType,
    currentStatus,
    states,
    patient,
    shortFacilities,
    createInventory,
    facilityStaff,
    staffDesignation,
    cities,
    localBody,
    facilityAdminstrators,
    profile,
    userTypes,
    toasts,
    testingLabs,
    fetchDetails,
});
