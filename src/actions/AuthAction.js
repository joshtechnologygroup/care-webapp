import * as HttpStatus from 'http-status-codes'

import {
    LOGIN_URL,
} from 'Src/routes';

import {
    setTokenCookie,
} from 'Services/CookieService';

import {
    USER
} from 'Reducers/Types'


import { Service } from "../utils/services";

const login = (email, password) => async (dispatch) => {
    const headers = {
        'Content-Type': 'application/json',
    };
    const body =  JSON.stringify({
        email: email,
        password: password,
    })
    const response = await Service(LOGIN_URL,'POST', null, body, headers)
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

export { login };
