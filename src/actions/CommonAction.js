import * as HttpStatus from 'http-status-codes'

import { makeApiCall } from "Src/utils/services";
import { DISTRICT_LIST_URL, OWNERSHIP_TYPE_LIST_URL } from 'Src/routes';
import { GET, APPLICATION_JSON } from "Src/constants";
import { GET_DISTRICT_LIST, GET_OWNERSHIP_TYPE_LIST } from 'Reducers/Types'
import * as CookieService from 'Services/CookieService';

const getDistrictList = (params) => async (dispatch) => {
    const headers = {
        'Authorization': `Token ${ CookieService.getTokenCookie() }`, 
        'Content-Type': APPLICATION_JSON,
    };
    const response = await makeApiCall(DISTRICT_LIST_URL, GET, {}, headers, params)
    const data = await response.json();
    if (response.status === HttpStatus.OK) {
        dispatch({
            type: GET_DISTRICT_LIST,
            data: data
        });
        return { status: response.ok };
    } else {
        return { status: response.ok, error_message: data.non_field_errors };
    }
};

const getOwnershipTypeList = (params) => async (dispatch) => {
    const headers = {
        'Authorization': `Token ${ CookieService.getTokenCookie() }`, 
        'Content-Type': APPLICATION_JSON,
    };
    const response = await makeApiCall(OWNERSHIP_TYPE_LIST_URL, GET, {}, headers, params)
    const data = await response.json();
    if (response.status === HttpStatus.OK) {
        dispatch({
            type: GET_OWNERSHIP_TYPE_LIST,
            data: data
        });
        return { status: response.ok };
    } else {
        return { status: response.ok, error_message: data.non_field_errors };
    }
};

export { getDistrictList, getOwnershipTypeList }
