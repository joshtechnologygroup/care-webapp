import { GET_FACILITY_LIST, GET_FACILITY_TYPE_LIST, GET_FACILITY_INVENTORY_LIST } from "Reducers/Types";

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

const facilityInventoryList = (state = initialState, action) => {
    if (action.type === GET_FACILITY_INVENTORY_LIST) {
        return { 
            ...state,
            ...action.results
        };
    }
    return state;
};

export { facilities, facilityTypes, facilityInventoryList };
