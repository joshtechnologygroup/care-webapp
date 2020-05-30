import { dispatchAction, dispatchDependentActions } from 'Actions/common';


const getsBedsListDependencies = (required_data) => async (dispatch) => {
  return await dispatch(dispatchDependentActions(...required_data));
};


export { getsBedsListDependencies };
