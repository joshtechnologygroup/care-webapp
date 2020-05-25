import { GET_OWNERSHIP_TYPE_LIST, GET_DISTRICT_LIST } from "Reducers/Types";

const districts = (state = {}, action) => {
    if (action.type === GET_DISTRICT_LIST) {
        return { 
            ...state,
            ...action.data 
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

export { districts, ownershipTypes };
