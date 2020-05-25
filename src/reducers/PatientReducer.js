import { GET_PATIENT_LIST } from "Reducers/Types";

const initialState = {};

const patients = (state = initialState, action) => {
    if (action.type === GET_PATIENT_LIST) {
        return { 
            ...state,
            ...action.data 
        };
    }
    return state;
};

export { patients };
