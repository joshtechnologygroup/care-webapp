import * as CommonService from "Src/utils/services";
import { GET, PATCH } from "Src/constants";
import * as ReducerTypes from 'Reducers/Types';
import { FACILITY_INFRASTRUCTURE_LIST_URL } from 'Src/routes';
import { dispatchAction, dispatchDependentActions } from 'Actions/common';

const getBedsList = (url, params = {}) => async (dispatch) => {
  const response = await CommonService.makeAuthorizedApiCall(url, GET, {},  params)
  dispatch(dispatchAction(ReducerTypes.GET_FACILITY_INFRASTRUCTURE_LIST, response));
};

const updateFacilityInfrastructure = (body, url) => async (dispatch) => {
  const response = await CommonService.makeAuthorizedApiCall(url, PATCH, body,  {});
  const data = await response.json();
  if( response.ok ){
    dispatch(getBedsList(FACILITY_INFRASTRUCTURE_LIST_URL));
    return { status: true };
  } else {
    return { status: false, detail: data.detail };
  }
}

const getsBedsListDependencies = (required_data) => async (dispatch) => {
  return await dispatch(dispatchDependentActions(...required_data));
};


export { getsBedsListDependencies, getBedsList, updateFacilityInfrastructure };
