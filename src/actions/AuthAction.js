import * as HttpStatus from 'http-status-codes'

import {
    LOGIN_URL,
    LOGOUT_URL
} from 'Src/routes';

import {
    setTokenCookie,
    getTokenCookie,
    deleteTokenCookie
} from 'Services/CookieService';

import {
    USER,
    CLEAR_USER
} from 'Reducers/Types'

import { POST, DELETE } from "Src/constants";


import { Service } from "../utils/services";

const login = (email, password) => async (dispatch) => {
    const headers = {
        'Content-Type': 'application/json',
    };
    const body =  JSON.stringify({
        email: email,
        password: password,
    })
<<<<<<< HEAD
    const response = await Service(LOGIN_URL,POST, body, headers)
=======
    const response = await Service(LOGIN_URL, POST, body, headers)
>>>>>>> bcd7eb6e87c5a89f93e1f406f7ab5e72e8a4af72
    const data = await response.json();
    if (response.status === HttpStatus.OK) {
        setTokenCookie(data.token);
        dispatch({
            type: USER,
            data: data
        });
        return { status: response.ok };
    } else {
        return { status: response.ok, error_message: data.non_field_errors };
    }
};

const logout = () => async (dispatch) => {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Token ${ getTokenCookie() }`,
    };
    const body = {}
    const response = await Service(LOGOUT_URL, DELETE, body, headers);
    deleteTokenCookie();
    if (response.status === HttpStatus.NO_CONTENT) {
        dispatch({
            type: CLEAR_USER
        });
    }
};

export { login, logout };
