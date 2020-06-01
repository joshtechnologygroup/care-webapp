import * as CommonService from "Src/utils/services";
import { GET, POST } from "Src/constants";
import * as ReducerTypes from 'Reducers/Types';
import { dispatchAction, dispatchDependentActions } from 'Actions/common';

const getBedsList = (url, params = {}) => async (dispatch) => {
  const response = await CommonService.makeAuthorizedApiCall(url, GET, {},  params)
  dispatch(dispatchAction(ReducerTypes.GET_FACILITY_INFRASTRUCTURE_LIST, response));
};

const getsBedsListDependencies = (required_data) => async (dispatch) => {
  return await dispatch(dispatchDependentActions(...required_data));
};


export { getsBedsListDependencies, getBedsList };
