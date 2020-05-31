import { GET_FACILITY_LIST, GET_FACILITY_TYPE_LIST, GET_FACILITY_INVENTORY_LIST, GET_INVENTORY_TYPE_LIST, SET_ERROR_CREATE_INVENTORY, GET_SHORT_FACILITY_LIST } from "Reducers/Types";

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

const shortFacilities = (state = {}, action) => {
    if (action.type === GET_SHORT_FACILITY_LIST) {
        return { 
            ...state,
            ...action.data
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

export { facilities, facilityTypes, facilityInventoryList, InventoryTypeList,  shortFacilities, createInventory };
