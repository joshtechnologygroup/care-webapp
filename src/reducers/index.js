import { combineReducers } from "redux";
import { user } from "Reducers/UserReducer";
import { 
    patients, 
    clinicalStatus, 
    clusterGroup, 
    covidStatus,
    currentStatus, 
    states, 
    patient
} from "Reducers/PatientReducer";
import {
    facilities,
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
import { ownershipTypes, districts } from "Reducers/MiscReducer";
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
    staffDesignation
});
