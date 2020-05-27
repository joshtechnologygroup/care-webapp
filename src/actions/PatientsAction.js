import * as CommonService from "Src/utils/services";
import * as Routes from 'Src/routes';
import { GET } from "Src/constants";
import * as ReducerTypes from 'Reducers/Types';
import { dispatchAction, dispatchDependentActions } from 'Actions/common';


const getPatientList = (url) => async (dispatch) => {
    const response = await CommonService.makeAuthorizedApiCall(url, GET, {})
    dispatch(dispatchAction(ReducerTypes.GET_PATIENT_LIST, response));
};


const getsPatientDependencies = (params) => async (dispatch) => {
    return await dispatch(dispatchDependentActions(
        [
            [Routes.CLINICAL_STATUS_LIST_URL, GET, {}, params],
            [Routes.DISTRICT_LIST_URL, GET, {}, params],
            [Routes.CLUSTER_GROUP_LIST_URL, GET, {}, params],
            [Routes.COVID_STATUS_LIST_URL, GET, {}, params],
        ],
        [
            ReducerTypes.GET_CLINICAL_STATUS_LIST,
            ReducerTypes.GET_DISTRICT_LIST,
            ReducerTypes.GET_CLUSTER_GROUP_LIST,
            ReducerTypes.GET_COVID_STATUS_LIST
        ]
    ));
};


export { getPatientList, getsPatientDependencies };
