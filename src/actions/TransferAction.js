import * as CommonService from "Src/utils/services";
import { TRANSFER_LIST_URL, TRANSFER_UPDATE_URL } from 'Src/routes';
import { GET, PATCH } from "Src/constants";
import { 
    GET_TRANSFER_LIST, 
    UPDATE_TRANSFER_STATUS, 
    UPDATE_TRANSFER_STATUS_ERROR 
} from 'Reducers/Types';
import { dispatchAction } from 'Actions/common';

const getTransferList = (params) => async (dispatch) => {
    const response = await CommonService.makeAuthorizedApiCall(TRANSFER_LIST_URL, GET, {}, params)
    dispatch(dispatchAction(GET_TRANSFER_LIST, response));
};

const updateTransferStatus = (patientTransferId, body) => async (dispatch) => {
    const response = await CommonService.updateTransferStatus(TRANSFER_UPDATE_URL + patientTransferId + '/', PATCH, body, {})
    if(response.status === 200) {
        return dispatch(dispatchAction(UPDATE_TRANSFER_STATUS, response));
    } else if(response.status === 400) {
        return dispatch(dispatchAction(UPDATE_TRANSFER_STATUS_ERROR, response));
    }
    return response;
};

export { getTransferList, updateTransferStatus }
