import * as CommonService from "Src/utils/services";
import { GET } from "Src/constants";
import * as ReducerTypes from 'Reducers/Types';
import { dispatchAction, dispatchDependentActions } from 'Actions/common';


const getPatientList = (url, params = {}) => async (dispatch) => {
    const response = await CommonService.makeAuthorizedApiCall(url, GET, {},  params)
    dispatch(dispatchAction(ReducerTypes.GET_PATIENT_LIST, response));
};


const getsPatientDependencies = (required_data) => async (dispatch) => {
    return await dispatch(dispatchDependentActions(...required_data));
};


export { getPatientList, getsPatientDependencies };
