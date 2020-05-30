import {
    GET_PATIENT_LIST,
    GET_CLINICAL_STATUS_LIST,
    GET_CLUSTER_GROUP_LIST,
    GET_COVID_STATUS_LIST,
    GET_PATIENT_STATUS_LIST,
    GET_STATE_LIST
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
        console.log(action.data)
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

export { patients, clinicalStatus, clusterGroup, covidStatus, currentStatus, states };
