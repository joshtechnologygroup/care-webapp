import { dispatchAction, dispatchDependentActions } from 'Actions/common';

const getsFacilityDetailDependencies = (required_data) => async (dispatch) => {
  return await dispatch(dispatchDependentActions(...required_data));
};

export { getsFacilityDetailDependencies };
