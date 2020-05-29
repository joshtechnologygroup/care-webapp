import * as CommonService from "Src/utils/services";
import { TRANSFER_LIST_URL, TRANSFER_UPDATE_URL } from 'Src/routes';
import { GET, PATCH } from "Src/constants";
import { GET_TRANSFER_LIST, UPDATE_TRANSFER_STATUS } from 'Reducers/Types';
import { dispatchAction } from 'Actions/common';

const getTransferList = (params) => async (dispatch) => {
    const response = await CommonService.makeAuthorizedApiCall(TRANSFER_LIST_URL, GET, {}, params)
    dispatch(dispatchAction(GET_TRANSFER_LIST, response));
};

const updateTransferStatus = (patientTransferId, body) => async (dispatch) => {
    const response = await CommonService.makeAuthorizedApiCall(TRANSFER_UPDATE_URL + patientTransferId + '/', PATCH, body, {})
    dispatch(dispatchAction(UPDATE_TRANSFER_STATUS, response));
};

export { getTransferList, updateTransferStatus }
