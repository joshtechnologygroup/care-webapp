import {
    GET_OWNERSHIP_TYPE_LIST,
    GET_DISTRICT_LIST,
    GET_CITIES_LIST,
    GET_LOCAL_BODY_LIST
} from "Reducers/Types";

const districts = (state = {}, action) => {
    if (action.type === GET_DISTRICT_LIST) {
        return { 
            ...state,
            ...action.data 
        };
    }
    return state;
};

const cities = (state = {}, action) => {
    if (action.type === GET_CITIES_LIST) {
        return {
            ...state,
            results: [...action.data]
        };
    }
    return state;
};

const localBody = (state = {}, action) => {
    if (action.type === GET_LOCAL_BODY_LIST) {
        return {
            ...state,
            results: [...action.data]
        };
    }
    return state;
};

const ownershipTypes = (state = {}, action) => {
    if (action.type === GET_OWNERSHIP_TYPE_LIST) {
        return { 
            ...state,
            ...action.data 
        };
    }
    return state;
};

export {districts, ownershipTypes, cities, localBody};
