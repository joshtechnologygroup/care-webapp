import * as CommonService from "Src/utils/services";
import * as Routes from 'Src/routes';
import { POST, PUT, GET } from "Src/constants";
import * as ReducerTypes from 'Reducers/Types';
import { dispatchAction, dispatchDependentActions } from 'Actions/common';
import * as HttpStatus from 'http-status-codes'


/**
 * create the portie details associated with patient
 * @param {object} body: contains details of the portie calling 
 */
const createPortieDetails = (body) => async (dispatch) => {
    const portie_response = await CommonService.makeAuthorizedApiCall(Routes.PORTIE_CALLING_URL, POST, body, {});
    if (portie_response.ok) {
        return { status: true };
    } else if (portie_response.status === HttpStatus.BAD_REQUEST) {
        const data = await portie_response.json();
        return { status: false, error: "dummy error generated in UI" };
    }
};

/**
 * update the portie details associated with patient
 * @param {object} body: contains details of the portie calling 
 * @param {number} portieId: portie calling id used to update portie
 */
const updatePortieDetails = (body, portieId) => async (dispatch) => {
    const portie_response = await CommonService.makeAuthorizedApiCall(`${Routes.PORTIE_CALLING_URL}${portieId}/`, PUT, body, {})
    if (portie_response.ok) {
        return { status: true };
    } else if (portie_response.status === HttpStatus.BAD_REQUEST) {
        const data = await portie_response.json();
        return { status: false, error: "dummy error generated in UI" };
    }
};

const getPorteaUsers = (params) => async (dispatch) => {
    const response = await CommonService.makeAuthorizedApiCall(Routes.GET_PORTEA_USERS, GET, {}, params);
    if (response.ok) {
        dispatch(dispatchAction(ReducerTypes.GET_PORTEA_USERS, response));
    }
}

export { createPortieDetails, updatePortieDetails, getPorteaUsers };
