import { combineReducers } from "redux";
import { user } from "Reducers/UserReducer";
import { facilities, facilityTypes, facilityInventoryList, InventoryTypeList } from "Reducers/FacilityReducer";
import { patients, clinicalStatus, clusterGroup, covidStatus, currentStatus, states, patient } from "Reducers/PatientReducer";
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
    currentStatus,
    states,
    patient
});
