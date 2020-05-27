import { combineReducers } from "redux";
import { user } from "Reducers/UserReducer";
import { facilities, facilityTypes, facilityInventoryList, InventoryTypeList } from "Reducers/FacilityReducer";
import { patients, clinicalStatus, clusterGroup, covidStatus } from "Reducers/PatientReducer";
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
    transfers: transfers,
    patients,
    clinicalStatus,
    clusterGroup,
    covidStatus
});
