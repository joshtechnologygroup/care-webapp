import { combineReducers } from "redux";
import { user } from "Reducers/UserReducer";
import { patients, clinicalStatus, clusterGroup, covidStatus } from "Reducers/PatientReducer";
import { facilities, facilityTypes, facilityInventoryList, InventoryTypeList } from "Reducers/FacilityReducer";
import { ownershipTypes, districts } from "Reducers/MiscReducer";
import { transfers } from "Reducers/TransferReducer";

export default combineReducers({
    user: user,
    facilities: facilities,
    facilityTypes: facilityTypes,
    inventory:facilityInventoryList,
    inventoryTypes:InventoryTypeList,
    ownershipTypes: ownershipTypes,
    districts: districts,
    patients,
    clinicalStatus,
    clusterGroup,
    covidStatus,
    transfers: transfers,
});
