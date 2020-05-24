import * as HttpStatus from 'http-status-codes'

import * as CookieService from 'Services/CookieService';

import * as CommonServiceUtils from "Src/utils/services";

import {
    LOGIN_URL,
    LOGOUT_URL,
    PASSWORD_FORGOT_URL,
    PASSWORD_RESET_URL
} from 'Src/routes';

import {
    SET_USER,
    CLEAR_USER,
} from 'Reducers/Types'

import { 
    POST, 
    DELETE,
    APPLICATION_JSON,
} from "Src/constants";


const login = (email, password) => async (dispatch) => {
    const headers = {
        'Content-Type': APPLICATION_JSON,
    };
    const body =  JSON.stringify({
        email: email,
        password: password,
    })
    const response = await CommonServiceUtils.makeApiCall(LOGIN_URL, POST, body, headers)
    const data = await response.json();
    if (response.status === HttpStatus.OK) {
        CookieService.setTokenCookie(data.token);
        dispatch({
            type: SET_USER,
            data: data
        });
        return { status: response.ok };
    } else {
        return { status: response.ok, error_message: data.non_field_errors };
    }
};

const forgot_password = (email) => async (dispatch) => {
    const headers = {
        'Content-Type': APPLICATION_JSON
    };
    const body = JSON.stringify({
        email: email
    })
    const response = await CommonServiceUtils.makeApiCall(PASSWORD_FORGOT_URL, POST, body, headers);
    return response.status
}

const logout = () => async (dispatch) => {
    const headers = {
        'Content-Type': APPLICATION_JSON,
        'Authorization': `Token ${ CookieService.getTokenCookie() }`,
    };
    const body = {}
    const response = await CommonServiceUtils.makeApiCall(LOGOUT_URL, DELETE, body, headers);
    CookieService.deleteTokenCookie();
    if (response.status === HttpStatus.NO_CONTENT) {
        dispatch({
            type: CLEAR_USER
        });
    }
};

const reset_password = (method, user_id, token, body = null) => async (dispatch) => {
    const headers = {
        'Content-Type': APPLICATION_JSON,
    };
    const url = PASSWORD_RESET_URL + user_id + '/' + token + ''
    const response = await CommonServiceUtils.makeApiCall(url, method, body, headers);
    return response.status;
};

export { login, logout, forgot_password, reset_password };
