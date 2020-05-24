import * as HttpStatus from 'http-status-codes'

import { makeApiCall } from "Src/utils/services";
import { FACILITY_LIST_URL, FACILITY_TYPE_LIST_URL } from 'Src/routes';
import { GET, APPLICATION_JSON } from "Src/constants";
import { GET_FACILITY_LIST, GET_FACILITY_TYPE_LIST } from 'Reducers/Types'
import * as CookieService from 'Services/CookieService';

const getFacilitiesList = (params) => async (dispatch) => {
    const headers = {
        'Authorization': `Token ${ CookieService.getTokenCookie() }`, 
        'Content-Type': APPLICATION_JSON,
    };
    const response = await makeApiCall(FACILITY_LIST_URL, GET, {}, headers, params)
    const data = await response.json();
    if (response.status === HttpStatus.OK) {
        dispatch({
            type: GET_FACILITY_LIST,
            data: data
        });
        return { status: response.ok };
    } else {
        return { status: response.ok, error_message: data.non_field_errors };
    }
};

const getFacilityTypeList = (params) => async (dispatch) => {
    const headers = {
        'Authorization': `Token ${ CookieService.getTokenCookie() }`, 
        'Content-Type': APPLICATION_JSON,
    };
    const response = await makeApiCall(FACILITY_TYPE_LIST_URL, GET, {}, headers, params)
    const data = await response.json();
    if (response.status === HttpStatus.OK) {
        dispatch({
            type: GET_FACILITY_TYPE_LIST,
            data: data
        });
        return { status: response.ok };
    } else {
        return { status: response.ok, error_message: data.non_field_errors };
    }
};

export { getFacilitiesList, getFacilityTypeList }
