import * as CommonService from "Src/utils/services";
import { DISTRICT_LIST_URL, OWNERSHIP_TYPE_LIST_URL } from 'Src/routes';
import { GET } from "Src/constants";
import { GET_DISTRICT_LIST, GET_OWNERSHIP_TYPE_LIST } from 'Reducers/Types';
import { dispatchAction } from 'Actions/common';

const getDistrictList = (params) => async (dispatch) => {
    const response = await CommonService.makeAuthorizedApiCall(DISTRICT_LIST_URL, GET, {}, params)
    dispatch(dispatchAction(GET_DISTRICT_LIST, response));
};

const getOwnershipTypeList = (params) => async (dispatch) => {
    const response = await CommonService.makeAuthorizedApiCall(OWNERSHIP_TYPE_LIST_URL, GET, {}, params)
    dispatch(dispatchAction(GET_OWNERSHIP_TYPE_LIST, response));
};

export { getDistrictList, getOwnershipTypeList }
