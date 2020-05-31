import {
    GET_FACILITY_LIST,
    GET_FACILITY_TYPE_LIST,
    GET_FACILITY_INVENTORY_LIST,
    GET_INVENTORY_TYPE_LIST,
    INVENTORY_CREATED_SUCCESSFULLY,
    GET_SHORT_FACILITY_LIST,
    GET_FACILITY_INFRASTRUCTURE_LIST,
    GET_ROOM_TYPE_LIST,
    GET_BED_TYPE_LIST
} from "Reducers/Types";

const initialState = {};

const facilities = (state = {}, action) => {
    if (action.type === GET_FACILITY_LIST) {
        return { 
            ...state,
            ...action.data 
        };
    }
    return state;
};

const facilityTypes = (state = {}, action) => {
    if (action.type === GET_FACILITY_TYPE_LIST) {
        return { 
            ...state,
            ...action.data 
        };
    }
    return state;
};

const facilityInventoryList = (state = {}, action) => {
    if (action.type === GET_FACILITY_INVENTORY_LIST) {
        return { 
            ...state,
            ...action.data
        };
    }
    return state;
};

const InventoryTypeList = (state = {}, action) => {
    if (action.type === GET_INVENTORY_TYPE_LIST) {
        return { 
            ...state,
            ...action.data
        };
    }
    return state;
};

const facilityInfrastructure = (state = initialState, action) => {
    if (action.type === GET_FACILITY_INFRASTRUCTURE_LIST) {
        return {
            ...state,
            ...action.data
        };
    }
    return state;
};

const shortFacilities = (state = {}, action) => {
    if (action.type === GET_SHORT_FACILITY_LIST) {
        return { 
            ...state,
            ...action.data
        };
    }
    return state;
};

const roomType = (state = initialState, action) => {
    if (action.type === GET_ROOM_TYPE_LIST) {
        return {
            ...state,
            results: [...action.data]
        };
    }
    return state;
};

const bedType = (state = initialState, action) => {
    if (action.type === GET_BED_TYPE_LIST) {
        return {
            ...state,
            results: [...action.data]
        };
    }
    return state;
};

const createInventory = (state = initialState, action) => {
    if (action.type === INVENTORY_CREATED_SUCCESSFULLY) {
        return { 
            ...state,
            ...action.data
        };
    }
    return state;
};

export { 
    facilities,
    facilityTypes, 
    facilityInventoryList, 
    InventoryTypeList, 
    facilityInfrastructure, 
    roomType, 
    bedType, 
    shortFacilities, 
    createInventory 
};
