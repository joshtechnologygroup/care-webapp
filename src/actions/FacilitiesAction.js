import * as CommonService from "Src/utils/services";
import * as Routes from 'Src/routes';
import { GET } from "Src/constants";
import * as ReducerTypes from 'Reducers/Types';
import { dispatchAction, dispatchDependentActions } from 'Actions/common';

const getFacilitiesList = (params) => async (dispatch) => {
    const response = await CommonService.makeAuthorizedApiCall(Routes.FACILITY_LIST_URL, GET, {}, params)
    dispatch(dispatchAction(ReducerTypes.GET_FACILITY_LIST, response));
};

const getFacilityDependencies = (params) => async (dispatch) => {
    dispatch(dispatchDependentActions(
        [
            [Routes.FACILITY_TYPE_LIST_URL, GET, {}, params],
            [Routes.OWNERSHIP_TYPE_LIST_URL, GET, {}, params],
            [Routes.DISTRICT_LIST_URL, GET, {}, params],
        ],
        [ReducerTypes.GET_FACILITY_TYPE_LIST, ReducerTypes.GET_OWNERSHIP_TYPE_LIST, ReducerTypes.GET_DISTRICT_LIST]
    ));
};

export { getFacilitiesList, getFacilityDependencies }
