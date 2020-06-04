import * as CommonService from "Src/utils/services";
import {GET, PATCH} from "Src/constants";
import * as ReducerTypes from 'Reducers/Types';
import {dispatchAction, dispatchDependentActions} from 'Actions/common';
import {FACILITY_STAFF_LIST_URL} from 'Src/routes';
import * as StringUtils from 'Src/utils/stringformatting';
import {PAGINATION_LIMIT, OFFSET} from 'Src/constants';

const getStaffList = (url, params = {}) => async (dispatch) => {
  const response = await CommonService.makeAuthorizedApiCall(url, GET, {}, params)
  dispatch(dispatchAction(ReducerTypes.GET_FACILITY_STAFF_LIST, response));
};

const updateCreateStaffList = (url, body, method) => async (dispatch) => {
  const response = await CommonService.makeAuthorizedApiCall(url, method, body);
  const data = await response.json();
  if (response.ok) {
    dispatch(getStaffList(StringUtils.formatVarString(FACILITY_STAFF_LIST_URL, [PAGINATION_LIMIT, OFFSET])));
    return {status: true};
  } else {
    return {status: false, ...data}
  }
}

const getsFacilityStaffListDependencies = (required_data) => async (dispatch) => {
  return await dispatch(dispatchDependentActions(...required_data));
};


export {getsFacilityStaffListDependencies, getStaffList, updateCreateStaffList};
