import * as CommonService from "Src/utils/services";
import { GET, PATCH } from "Src/constants";
import * as ReducerTypes from 'Reducers/Types';
import { dispatchAction, dispatchDependentActions } from 'Actions/common';

const getStaffList = (url, params = {}) => async (dispatch) => {
  const response = await CommonService.makeAuthorizedApiCall(url, GET, {},  params)
  dispatch(dispatchAction(ReducerTypes.GET_FACILITY_STAFF_LIST, response));
};

const getsFacilityStaffListDependencies = (required_data) => async (dispatch) => {
  return await dispatch(dispatchDependentActions(...required_data));
};


export { getsFacilityStaffListDependencies, getStaffList };
