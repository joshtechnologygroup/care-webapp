import * as CommonService from "Src/utils/services";
import * as Routes from 'Src/routes';
import { GET, POST } from "Src/constants";
import * as ReducerTypes from 'Reducers/Types';
import { dispatchAction, dispatchDependentActions } from 'Actions/common';

const getPatientList = (url, params = {}) => async (dispatch) => {
    const response = await CommonService.makeAuthorizedApiCall(url, GET, {},  params)
    dispatch(dispatchAction(ReducerTypes.GET_PATIENT_LIST, response));
};


const getsPatientDependencies = (required_data) => async (dispatch) => {
    return await dispatch(dispatchDependentActions(...required_data));
};


const getProfileDependencies = (params) => async (dispatch) => {
    return await dispatch(dispatchDependentActions(
        [
            [Routes.CLINICAL_STATUS_LIST_URL, GET, {}, params],
            [Routes.DISTRICT_LIST_URL, GET, {}, params],
            [Routes.CLUSTER_GROUP_LIST_URL, GET, {}, params],
            [Routes.COVID_STATUS_LIST_URL, GET, {}, params],
            [Routes.FACILITY_LIST_URL, GET, {}, params],
            [Routes.PATIENT_STATUS_LIST_URL, GET, {}, params],
            [Routes.STATE_LIST_URL, GET, {}, params],
        ],
        [
            ReducerTypes.GET_CLINICAL_STATUS_LIST,
            ReducerTypes.GET_DISTRICT_LIST,
            ReducerTypes.GET_CLUSTER_GROUP_LIST,
            ReducerTypes.GET_COVID_STATUS_LIST,
            ReducerTypes.GET_FACILITY_LIST,
            ReducerTypes.GET_PATIENT_STATUS_LIST,
            ReducerTypes.GET_STATE_LIST
        ]
    ));
};


const createPatient = (state) => async (dispatch) => {
    const create_patient_response = await CommonService.makeAuthorizedApiCall(Routes.CREATE_PATIENT_LIST_URL, POST, state, {})
    return create_patient_response.ok;
}


const fetchPatient = id => async (dispatch) => {
    const fetch_patient_response = await CommonService.makeAuthorizedApiCall(`${Routes.GET_PATIENT_URL}${id}/`, GET, {}, {})
    if(fetch_patient_response.ok){
        const data = await fetch_patient_response.json()
        dispatch({
            type: ReducerTypes.SET_CURRENT_PATIENT,
            data: data
        });
    }
}


export { getPatientList, getsPatientDependencies, getProfileDependencies, createPatient, fetchPatient }
