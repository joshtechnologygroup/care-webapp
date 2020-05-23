import {
    setTokenCookie,
    getTokenCookie,
    deleteTokenCookie
} from 'Services/CookieService';

import {
    USER,
    CLEAR_USER
} from 'Reducers/Types'

import {
    LoginUserService,
    LogoutUserService
} from 'Services/AuthService'


const login = (email, password) => async (dispatch) => {
    const response = await LoginUserService(email, password);
    const data = await response.json();
    if (response.status === 200) {
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
    const response = await LogoutUserService(getTokenCookie());
    deleteTokenCookie();
    if (response.status === 204) {
        dispatch({
            type: CLEAR_USER
        });
    }
};

export { login, logout };
