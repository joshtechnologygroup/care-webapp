import {
    GET_FACILITY_LIST,
    GET_FACILITY_TYPE_LIST,
    GET_FACILITY_INVENTORY_LIST,
    GET_INVENTORY_TYPE_LIST,
    SET_ERROR_CREATE_INVENTORY,
    GET_SHORT_FACILITY_LIST,
    GET_FACILITY_INFRASTRUCTURE_LIST,
    GET_ROOM_TYPE_LIST,
    GET_BED_TYPE_LIST,
    GET_FACILITY_STAFF_LIST,
    GET_STAFF_DESIGNATION_LIST
} from "Reducers/Types";

const initialState = { error: null};

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
    if (action.type === SET_ERROR_CREATE_INVENTORY) {
        return { 
            ...state,
            error:action.error
        };
    }
    return state;
};

const facilityStaff = (state = initialState, action) => {
    if (action.type === GET_FACILITY_STAFF_LIST) {
        return {
            ...state,
            ...action.data
        };
    }
    return state;
};

const staffDesignation = (state = initialState, action) => {
    if (action.type === GET_STAFF_DESIGNATION_LIST) {
        return {
            ...state,
            results: [...action.data]
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
    createInventory ,
    facilityStaff,
    staffDesignation
};
