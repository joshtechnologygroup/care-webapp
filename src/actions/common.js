import * as HttpStatus from 'http-status-codes';
import * as CommonService from "Src/utils/services";

const dispatchAction = (actionType, response) => async (dispatch) => {
    const data = await response.json();
    if (response.status === HttpStatus.OK) {
        dispatch({
            type: actionType,
            data: data
        });
        return { status: response.ok };
    } else {
        return { status: response.ok, error_message: data };
    }
}

const dispatchDependentActions = (argumentsList, actionTypeList) => async (dispatch) => {
    const responseList = await Promise.all(argumentsList.map((argument, index) => {
        return CommonService.makeAuthorizedApiCall(...argument);
    }));
    return responseList.map((response, index) => dispatch(dispatchAction(actionTypeList[index], response)));
}

export { dispatchAction, dispatchDependentActions }
