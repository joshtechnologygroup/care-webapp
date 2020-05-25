import * as CommonService from "Src/utils/services";
import { FACILITY_LIST_URL, FACILITY_TYPE_LIST_URL } from 'Src/routes';
import { GET } from "Src/constants";
import { GET_FACILITY_LIST, GET_FACILITY_TYPE_LIST } from 'Reducers/Types';
import { dispatchAction } from 'Actions/common';

const getFacilitiesList = (params) => async (dispatch) => {
    const response = await CommonService.makeAuthorizedApiCall(FACILITY_LIST_URL, GET, {}, params)
    dispatch(dispatchAction(GET_FACILITY_LIST, response));
};

const getFacilityTypeList = (params) => async (dispatch) => {
    const response = await CommonService.makeAuthorizedApiCall(FACILITY_TYPE_LIST_URL, GET, {}, params)
    dispatch(dispatchAction(GET_FACILITY_TYPE_LIST, response));
};

export { getFacilitiesList, getFacilityTypeList }
