import { combineReducers } from "redux";
import UserReducer from "Reducers/UserReducer";
import { facilities, facilityTypes, facilityInventoryList, InventoryTypeList } from "Reducers/FacilityReducer";
import { ownershipTypes, districts } from "Reducers/MiscReducer";

export default combineReducers({
    User: UserReducer,
    facilities: facilities,
    inventory:facilityInventoryList,
    inventoryTypes:InventoryTypeList,
    ownershipTypes: ownershipTypes,
    districts: districts,
    facilityTypes: facilityTypes
});
