import {
    setTokenCookie,
} from '../services/CookieService';

import {
    USER
} from '../reducers/Types'

import {
    LoginUserService
} from '../services/AuthService'


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

export { login };
