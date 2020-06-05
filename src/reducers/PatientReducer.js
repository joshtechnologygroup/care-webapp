import {
    GET_PATIENT_LIST,
    GET_CLINICAL_STATUS_LIST,
    GET_CLUSTER_GROUP_LIST,
    GET_COVID_STATUS_LIST,
    GET_PATIENT_STATUS_LIST,
    GET_STATE_LIST,
    SET_CURRENT_PATIENT,
    CLEAR_PATIENT,
    GET_TESTING_LABS_LIST
} from "Reducers/Types";

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


const clinicalStatus = (state = {}, action) => {
    if (action.type === GET_CLINICAL_STATUS_LIST) {
        return {
            ...state,
            ...action.data
        };
    }
    return state;
};


const clusterGroup = (state = {}, action) => {
    if (action.type === GET_CLUSTER_GROUP_LIST) {
        return {
            ...state,
            ...action.data
        };
    }
    return state;
};


const covidStatus = (state = {}, action) => {
    if (action.type === GET_COVID_STATUS_LIST) {
        return {
            ...state,
            ...action.data
        };
    }
    return state;
};


const currentStatus = (state = {}, action) => {
    if (action.type === GET_PATIENT_STATUS_LIST) {
        return {
            ...state,
            ...action.data
        };
    }
    return state;
};


const states = (state = {}, action) => {
    if (action.type === GET_STATE_LIST) {
        return {
            ...state,
            ...action.data
        };
    }
    return state;
};

const patient = (state = {}, action) => {
    switch(action.type){
        case SET_CURRENT_PATIENT:
            return {
                ...state,
                ...action.data
            }
        case CLEAR_PATIENT:
            return {};
        default:
            return state;
    }
};

const testingLabs = (state = {}, action) => {
    switch(action.type){
        case GET_TESTING_LABS_LIST:
            return {
                ...state,
                results: [...action.data]
            }
        default:
            return state;
    }
};

export { patients, clinicalStatus, clusterGroup, covidStatus, currentStatus, states, patient, testingLabs };
