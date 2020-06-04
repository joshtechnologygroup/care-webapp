import * as CommonService from "Src/utils/services";
import { TRANSFER_LIST_URL, TRANSFER_UPDATE_URL, ADD_PATIENT_TRANSFER_URL } from 'Src/routes';
import { GET, PATCH, POST } from "Src/constants";
import { 
    GET_TRANSFER_LIST, 
    UPDATE_TRANSFER_STATUS, 
    UPDATE_TRANSFER_STATUS_ERROR,
    SET_TRANSFER_UPDATE_API_STATE,
    ADD_PATIENT_TRANSFER,
    ADD_PATIENT_TRANSFER_ERROR,
    SET_TRANSFER_ADD_API_STATE
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

const addPatientTransfer = (body) => async (dispatch) => {
    const response = await CommonService.addPatientTransfer(ADD_PATIENT_TRANSFER_URL, POST, body, {})
    if(response.status === 200) {
        return dispatch(dispatchAction(ADD_PATIENT_TRANSFER, response));
    } else if(response.status === 400) {
        return dispatch(dispatchAction(ADD_PATIENT_TRANSFER_ERROR, response));
    }
    return response;
};

const setTransferUpdateApiSuccess = (data) => async (dispatch) => {
    dispatch({
        type: SET_TRANSFER_UPDATE_API_STATE,
        data: data
    })
};

const setAddTransferApiSuccess = (data) => async (dispatch) => {
    dispatch({
        type: SET_TRANSFER_ADD_API_STATE,
        data: data
    })
};

export { getTransferList, updateTransferStatus, setTransferUpdateApiSuccess, addPatientTransfer, setAddTransferApiSuccess }
